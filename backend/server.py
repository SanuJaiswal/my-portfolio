from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import io
import json
import asyncio
import logging
import resend
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from pypdf import PdfReader
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL')
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app
app = FastAPI()

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

    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "success", "email_id": email.get("id")}
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again later.")


# ============ AI RESUME ANALYZER ============

RESUME_ANALYZER_SYSTEM_PROMPT = """You are a senior tech recruiter and resume coach. You analyze how well a resume matches a job description.

You ALWAYS respond with ONLY valid JSON in this exact structure (no markdown, no code fences):
{
  "match_score": <int 0-100>,
  "verdict": "<one-line summary, e.g. 'Strong match with minor gaps'>",
  "matched_skills": ["skill1", "skill2", ...],
  "missing_skills": ["skill1", "skill2", ...],
  "strengths": ["short bullet 1", "short bullet 2", "short bullet 3"],
  "gaps": ["short bullet 1", "short bullet 2", "short bullet 3"],
  "suggestions": ["actionable bullet 1", "actionable bullet 2", "actionable bullet 3", "actionable bullet 4"],
  "improved_bullets": [
    {"original": "<weak bullet from resume>", "improved": "<rewritten with metrics and JD keywords>"},
    {"original": "<weak bullet from resume>", "improved": "<rewritten with metrics and JD keywords>"}
  ]
}

Rules:
- match_score: be realistic, not generous. 90+ only if truly exceptional match.
- Keep arrays concise (3-6 items each).
- improved_bullets: pick 2-3 actual bullets from the resume and rewrite them stronger.
- All text in plain ASCII, no emojis."""


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text_parts = []
    for page in reader.pages:
        text_parts.append(page.extract_text() or "")
    return "\n".join(text_parts).strip()


@api_router.post("/resume/analyze")
async def analyze_resume(
    job_description: str = Form(...),
    resume_text: str = Form(default=""),
    resume_file: UploadFile = File(default=None),
):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    # Get resume content (from file or pasted text)
    resume_content = resume_text.strip()
    if resume_file is not None:
        try:
            pdf_bytes = await resume_file.read()
            if pdf_bytes:
                resume_content = await asyncio.to_thread(extract_text_from_pdf, pdf_bytes)
        except Exception as e:
            logger.error(f"PDF parse failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Could not read the PDF. Please paste resume text instead.")

    if not resume_content:
        raise HTTPException(status_code=400, detail="Resume content is required.")
    if len(job_description.strip()) < 30:
        raise HTTPException(status_code=400, detail="Job description is too short (min 30 chars).")

    # Truncate to avoid token limits
    resume_content = resume_content[:8000]
    job_description = job_description.strip()[:6000]

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"resume-{uuid.uuid4()}",
            system_message=RESUME_ANALYZER_SYSTEM_PROMPT,
        ).with_model("openai", "gpt-4o")

        user_text = (
            f"=== JOB DESCRIPTION ===\n{job_description}\n\n"
            f"=== RESUME ===\n{resume_content}\n\n"
            f"Analyze the match and respond with the required JSON only."
        )

        response = await chat.send_message(UserMessage(text=user_text))

        # Parse JSON (strip markdown fences if any)
        text = response.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip().rstrip("`").strip()

        result = json.loads(text)
        return result
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse failed: {str(e)} | raw: {response[:300]}")
        raise HTTPException(status_code=500, detail="AI returned an unexpected format. Please try again.")
    except Exception as e:
        logger.error(f"Resume analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze. Please try again.")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
