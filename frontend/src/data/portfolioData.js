export const profile = {
  name: "Sanu Jaiswal",
  role: "Software Engineer",
  location: "Bengaluru, India",
  email: "sjlskdevi49@gmail.com",
  resumeUrl: "",
  githubUrl: "https://github.com/SanuJaiswal",
  linkedinUrl: "https://www.linkedin.com/in/sanujaiswal/",
  summary: "Software Engineer with experience building scalable full-stack applications using React.js, Node.js, AWS, and modern web technologies.",
  intro: [
    "Currently working at Kenvue, previously associated with Deloitte USI, where I contributed to enterprise-grade applications focused on performance, scalability, automation, and user experience.",
    "I enjoy working across the stack, from designing APIs and backend automation to optimizing databases, cloud workflows, and responsive frontend experiences.",
    "I am interested in cloud technologies, GenAI applications, scalable systems, and product engineering, and I am always learning, building, and exploring better ways to create impactful software."
  ],
  highlights: [
    "Full-stack engineering with React, TypeScript, Node.js, and Express.js",
    "Cloud automation across AWS Lambda, S3, DynamoDB, Azure Storage, and Databricks",
    "GenAI and data tooling with Python, FAISS, OpenAI, and enterprise search"
  ]
};

export const stats = [
  { value: "2+", label: "Years across full-stack and automation work" },
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
    title: "Todo App",
    slug: "todo-app",
    description: "A React CRUD notes app for adding, editing, deleting, and tracking tasks in a lightweight interface.",
    isFeatured: false,
    image: "/projects/todo.png",
    url: "https://todolist501.netlify.app/",
    stack: ["React", "JavaScript", "CRUD"]
  },
  {
    id: 4,
    title: "Weather App",
    slug: "weather-app",
    description: "A real-time weather app that uses the OpenWeatherMap API to show temperature data for user-specified cities.",
    isFeatured: true,
    image: "/projects/weather.png",
    url: "https://sanujaiswal.github.io/Weather-App/",
    stack: ["JavaScript", "API", "CSS"]
  }
];
