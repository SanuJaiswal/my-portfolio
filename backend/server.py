from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app
app = FastAPI(title="Portfolio API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


def build_contact_email_html(name: str, sender_email: str, message: str) -> str:
    safe_message = message.replace('\n', '<br>')
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
      <tr><td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
          <tr><td style="background:#0f172a; padding:20px; color:#ffffff;">
            <h2 style="margin:0; font-size:20px;">New Portfolio Contact</h2>
            <p style="margin:4px 0 0; color:#94a3b8; font-size:13px;">From your portfolio website</p>
          </td></tr>
          <tr><td style="padding:24px; color:#0f172a;">
            <p style="margin:0 0 6px; font-size:13px; color:#64748b;">Name</p>
            <p style="margin:0 0 16px; font-size:16px; font-weight:600;">{name}</p>
            <p style="margin:0 0 6px; font-size:13px; color:#64748b;">Email</p>
            <p style="margin:0 0 16px; font-size:16px;"><a href="mailto:{sender_email}" style="color:#0891b2; text-decoration:none;">{sender_email}</a></p>
            <p style="margin:0 0 6px; font-size:13px; color:#64748b;">Message</p>
            <div style="padding:14px; background:#f1f5f9; border-radius:8px; font-size:15px; line-height:1.6;">{safe_message}</div>
          </td></tr>
          <tr><td style="background:#f8fafc; padding:14px; text-align:center; font-size:12px; color:#94a3b8;">
            Reply directly to this email to respond to {name}.
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


@api_router.get("/")
async def root():
    return {"message": "Portfolio API running"}


@api_router.post("/contact")
async def send_contact_message(payload: ContactMessage):
    if not OWNER_EMAIL:
        raise HTTPException(status_code=500, detail="Owner email not configured")

    html_content = build_contact_email_html(payload.name, payload.email, payload.message)
    params = {
        "from": f"Portfolio Contact <{SENDER_EMAIL}>",
        "to": [OWNER_EMAIL],
        "subject": f"New contact from {payload.name}",
        "html": html_content,
        "reply_to": payload.email,
    }

    async def _send_in_background(params: dict):
        try:
            await asyncio.to_thread(resend.Emails.send, params)
        except Exception as e:
            logger.error(f"Background email send failed: {str(e)}")

    # Fire and forget — return 200 immediately so the UI feels instant.
    asyncio.create_task(_send_in_background(params))
    return {"status": "queued"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
