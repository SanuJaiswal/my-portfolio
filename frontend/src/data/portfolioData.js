const yearsOfExperience = new Date().getFullYear() - 2023;

export const profile = {
  name: "Sanu Jaiswal",
  role: "Software Engineer & Freelancer",
  location: "Bengaluru, India",
  email: "sjlskdevi49@gmail.com",
  resumeUrl: "",
  githubUrl: "https://github.com/SanuJaiswal",
  linkedinUrl: "https://www.linkedin.com/in/sanujaiswal/",
  fiverrUrl: "https://www.fiverr.com/s/99lV2vj",
  fiverrGigUrl: "https://www.fiverr.com/s/kLqQx7L",
  tagline: "I help businesses ship modern, scalable web products — from idea to production.",
  summary: `Full-Stack Developer with ${yearsOfExperience}+ years of experience building production-grade React and Node.js applications for global enterprises. Now available for freelance projects.`,
  intro: [
    "I'm a Software Engineer currently at Kenvue, previously at Deloitte USI, where I've shipped enterprise dashboards, REST APIs, GenAI tools, and cloud automation used by real teams in production.",
    "I work end-to-end — designing clean UIs in React & TypeScript, building reliable Node.js / Python backends, integrating with AWS and databases, and obsessing over performance and user experience.",
    "Through freelancing on Fiverr, I'm helping startups, founders, and small businesses turn their ideas into well-built web applications. If you need a developer who treats your project like their own, let's talk."
  ],
  highlights: [
    "Full-stack engineering with React, TypeScript, Node.js, and Express.js",
    "Cloud automation across AWS Lambda, S3, DynamoDB, Azure Storage, and Databricks",
    "GenAI and data tooling with Python, FAISS, OpenAI, and enterprise search"
  ]
};

export const stats = [
  { value: `${yearsOfExperience}+`, label: "Years across full-stack and automation work" },
  { value: "4", label: "Client/product engineering streams delivered" },
  { value: "25%", label: "Manual testing effort reduced through automation" }
];

export const skills = [
  { name: "React", group: "Frontend", icon: "Code2" },
  { name: "TypeScript", group: "Frontend", icon: "FileCode" },
  { name: "JavaScript", group: "Frontend", icon: "FileJson" },
  { name: "Tailwind CSS", group: "Frontend", icon: "Palette" },
  { name: "Node.js", group: "Backend", icon: "Server" },
  { name: "Express.js", group: "Backend", icon: "Box" },
  { name: "Python", group: "Automation", icon: "Terminal" },
  { name: "AWS", group: "Cloud", icon: "Cloud" },
  { name: "DynamoDB", group: "Cloud", icon: "Database" },
  { name: "Java", group: "Automation", icon: "Coffee" },
  { name: "Selenium", group: "Automation", icon: "Bug" },
  { name: "C++", group: "Foundations", icon: "Code" }
];

export const experience = [
  {
    company: "Kenvue",
    role: "Full Stack Engineer",
    period: "Sep 2025 - Present",
    summary: "Delivering full-stack automation and enterprise search capabilities across React, TypeScript, Python, AWS, Azure Storage, and Databricks Unity Catalog.",
    impact: [
      "Built guided provisioning automation with prerequisite gating to reduce invalid executions and improve user flow reliability.",
      "Implemented GitHub App authentication using JWT and installation tokens with caching, plus clearer backend success and error propagation.",
      "Led Content Search integration with strong loading, empty, and error states to improve unstructured data discoverability.",
      "Supported backend automation with AWS Lambda, CloudWatch Logs, and DynamoDB metadata queries."
    ]
  },
  {
    company: "Deloitte USI",
    role: "Associate",
    period: "Jul 2023 - Aug 2025",
    summary: "Built enterprise dashboards, backend APIs, GenAI data comparison tools, and QA automation for client-facing releases.",
    impact: [
      "Developed responsive React dashboards with Shadcn and Tailwind CSS, improving UI consistency through reusable components.",
      "Architected RESTful APIs with Node.js and Express.js integrated with AWS Lambda and S3 for scalable backend processing.",
      "Created a Python tool using FAISS and OpenAI to compare Excel datasets, calculate similarity, and extract metadata.",
      "Automated scripts for 4 clients using Java, Selenium WebDriver, and TestNG, reducing manual effort by 25%."
    ]
  }
];

export const projects = [
  {
    id: 0,
    title: "AI Resume Analyzer",
    slug: "resume-analyzer",
    description: "Live AI tool that scores how well a resume matches a job description, surfaces skill gaps, and rewrites weak bullet points. Built with GPT-4o, FastAPI, BeautifulSoup web scraping, and Recharts data viz.",
    isFeatured: true,
    isInternal: false,
    image: "/projects/resume-analyzer.svg",
    url: "https://check-resume-score.netlify.app/",
    stack: ["React", "FastAPI", "GPT-4o", "Recharts"]
  },
  {
    id: 1,
    title: "BlogNest",
    slug: "blog-nest",
    description: "A responsive React blog platform using Appwrite for authentication, database management, and cloud file storage.",
    isFeatured: true,
    image: "/projects/blogNest.png",
    url: "https://blog-nest.netlify.app/",
    stack: ["React", "Appwrite", "Redux Toolkit", "TinyMCE"]
  },
  {
    id: 2,
    title: "Drum Kit",
    slug: "drum-kit",
    description: "An interactive browser drum kit that maps keyboard and mouse actions to individual instrument sounds.",
    isFeatured: false,
    image: "/projects/drumKit.png",
    url: "https://sanujaiswal.github.io/drumKit/",
    stack: ["JavaScript", "HTML", "CSS"]
  },
  {
    id: 3,
    title: "Weather App",
    slug: "weather-app",
    description: "A real-time weather app that uses the OpenWeatherMap API to show temperature data for user-specified cities.",
    isFeatured: true,
    image: "/projects/weather.png",
    url: "https://sanujaiswal.github.io/Weather-App/",
    stack: ["JavaScript", "API", "CSS"]
  }
];

export const services = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "End-to-end web application development using React, Node.js, and modern tech stack. From concept to deployment.",
    icon: "Laptop",
    features: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"]
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Beautiful, responsive, and performant user interfaces with modern frameworks and best practices.",
    icon: "Palette",
    features: ["React & TypeScript", "Tailwind CSS", "Responsive Design", "Component Libraries"]
  },
  {
    id: 3,
    title: "Backend & API Development",
    description: "Scalable RESTful APIs and backend services with robust architecture and security.",
    icon: "Server",
    features: ["REST APIs", "Database Integration", "Authentication", "Cloud Services"]
  }
];
