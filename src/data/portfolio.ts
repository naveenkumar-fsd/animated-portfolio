import type { Portfolio } from "../types/portfolio";

/**
 * ============================================================================
 *  YOUR PORTFOLIO CONTENT — edit this one file to update the whole website.
 * ============================================================================
 *
 *  EVERYTHING BELOW IS FICTIONAL SAMPLE DATA.
 *  The name, company names, dates, statistics, projects and all URLs are made up.
 *
 *  Before you publish, replace at least:
 *    - name, monogram, role, location, email
 *    - socialLinks.github and socialLinks.linkedin   (currently "your-username" placeholders)
 *    - every project's githubUrl / liveUrl            (currently placeholders)
 *    - experience, education, certifications, stats   (sample content)
 *    - resumeUrl / resumeFileName, and add your own PDF to the public/ folder
 *    - footerNote (remove the "sample content" sentence)
 *
 *  Also edit <title> and the description in index.html (search engines read that file).
 */
export const portfolio: Portfolio = {
  // ---------- Identity ----------
  name: "Naveenkumar M",
  monogram: "NK",
  role: "Full Stack Developer",
  location: "Chennai, Tamil Nadu, India",
  email: "naveenkumar977912345@gmail.com", // PLACEHOLDER: replace with your real email

  // ---------- Resume ----------
  // Put your own PDF at public/resume.pdf (see README.md → "Add the resume PDF").
  resumeUrl: "/resume.pdf",
  resumeFileName: "Naveenkumar-M-Resume.pdf", // the name the visitor's download gets

  availability: {
    open: true, // true = green dot, false = grey dot
    label: "Open to work", // text shown next to the dot
  },

  // ---------- Social profiles ----------
  // PLACEHOLDERS: replace "your-username" with your real profile names.
  socialLinks: {
    github: "https://github.com/naveenkumar-fsd",
    linkedin: "https://www.linkedin.com/in/naveenkumar-fsd",
  },

  // ---------- Navigation ----------
  // Each href must match a section id used in src/sections (home, about, skills, projects, experience, contact).
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  navCtaLabel: "Hire me",

  // ---------- Hero ----------
  hero: {
    eyebrow: "Full Stack Developer",
    headline: "I build calm, fast software for complicated problems.",
    highlight: "calm, fast software",
    intro:
      "I build modern web applications using Java, Spring Boot, React, and MySQL creating responsive user interfaces and reliable backend APIs.",
    rotatingLabel: "Currently into",
    rotatingPhrases: [
      "React + TypeScript interfaces",
      "Spring Boot REST APIs",
      "clean data models",
      "motion that means something",
    ],
  },

  // ---------- About ----------
  about: {
    bio: [
      "I'm a Java Full Stack Developer passionate about building practical web applications and solving real-world problems through code. I enjoy working across the stack, from designing responsive interfaces with React to developing REST APIs with Java and Spring Boot. I'm continuously learning, improving my coding skills, and building projects to strengthen my development experience.",
    ],
    strengths: [
      "Component-driven UI",
      "REST API design",
      "Readable, tested code",
      "Clear communication",
    ],
    philosophy:
      "Ship the simplest thing that solves the problem, then make it fast, accessible and easy to change.",
    enjoyBuilding: [
      "Dashboards that make dense data feel light",
      "REST APIs using Java and Spring Boot",
      "Design systems that other developers enjoy using",
    ],
    // SAMPLE VALUES: replace with real numbers or delete entries you cannot back up.
    stats: [
      { value: "12", label: "Projects built" },
      { value: "2", label: "Teams joined" },
      { value: "6 mo.", label: "Experience" },
    ],
  },

  // ---------- Skills (no percentages on purpose) ----------
  skills: [
    {
      id: "frontend",
      title: "Frontend",
      description: "Interfaces that are fast, responsive and accessible.",
      icon: "layout",
      items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS", "Motion"],
    },
    {
      id: "backend",
      title: "Backend",
      description: "Services with clear contracts and sensible structure.",
      icon: "server",
      items: ["Java", "Spring Boot", "REST APIs", "Node.js", "JWT authentication"],
    },
    {
      id: "database",
      title: "Database",
      description: "Schemas that stay understandable as they grow.",
      icon: "database",
      items: [ "MySQL","Data modelling", "SQL"]
    },
    {
      id: "tools",
      title: "Tools & Workflow",
      description: "Habits that keep shipping calm.",
      icon: "wrench",
      items: ["Git & GitHub", "Vite", "Docker", "Postman", "Visual Studio Code", "Vercel","Eclipse IDE"],
    },
  ],

  // ---------- Projects ----------
  // Each object below becomes one card automatically. To add a project, copy one object,
  // paste it into this array, give it a NEW unique id, and edit the fields.
  // githubUrl / liveUrl / caseStudyUrl are optional: omit one and its button disappears.
  // All URLs below are PLACEHOLDERS. These sample projects do not really exist.
 
projects: [
  {
    id: "solar-solutions",
    title: "Solar Solutions Web Application",
    problem:
      "Customers need an easier way to estimate solar installation costs, savings, and return on investment.",
    description:
      "A full-stack solar solutions application with a React frontend and Java Spring Boot REST APIs, featuring solar cost estimation, ROI calculations, savings analysis, and database integration.",
    technologies: ["React", "Java", "Spring Boot", "REST APIs", "MySQL"],
    category: "Full Stack Web Application",
    featured: true,
    visual: "orbit",
    accent: "violet",
    githubUrl: "https://github.com/naveenkumar-fsd/solstice-innovations",
    liveUrl: "",
  },
  {
    id: "workflowpro",
    title: "WorkflowPro — Approval Platform",
    problem:
      "Teams need a structured way to submit requests, manage approvals, and track workflow status.",
    description:
      "A workflow and approval management platform built around request tracking, approval processes, and role-based access, using React and Spring Boot.",
    technologies: [
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "MySQL",
      "JWT",
    ],
    category: "B2B SaaS · Full Stack",
    featured: true,
    visual: "nodes",
    accent: "cyan",
    githubUrl: "https://github.com/naveenkumar-fsd/workflow-hub",
    liveUrl: "",
  },
  {
    id: "service-management",
    title: "Service Management Platform",
    problem:
      "Users need a convenient way to browse services and manage service-related operations.",
    description:
      "A service management application with dynamic web interfaces and Java Spring Boot backend functionality for service listings and CRUD operations.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Java",
      "Spring Boot",
      "MySQL",
    ],
    category: "Full Stack Web Application",
    featured: true,
    visual: "bars",
    accent: "mint",
    githubUrl: "https://github.com/naveenkumar-fsd/smart-serve-hub",
    liveUrl: "",
  },
  {
    id: "expense-tracker",
    title: "Personal Expense Tracker",
    problem:
      "Manually tracking daily expenses makes it harder to organize spending and review monthly totals.",
    description:
      "A Java command-line expense tracker using OOP, Collections, LocalDate, and CSV-based file persistence, with CRUD operations, authentication, and monthly summaries.",
    technologies: [
      "Java",
      "OOP",
      "Collections",
      "LocalDate",
      "File Handling",
      "CSV",
    ],
    category: "Java Application",
    featured: true,
    visual: "grid",
    accent: "amber",
    githubUrl: "https://github.com/naveenkumar-fsd/expense-tracker-java-oops",
    liveUrl: "",
  },
  {
    id: "soil-nutrient-analysis",
    title: "Soil Nutrient Analysis System",
    problem:
      "Understanding soil nutrient levels helps inform agricultural decisions.",
    description:
      "An agriculture-focused project that processes sensor data through a Java application to analyze nitrogen, phosphorus, and potassium levels for agricultural insights.",
    technologies: [
      "Java",
      "Sensor Data Processing",
      "NPK Analysis",
      "Agriculture Engineering",
    ],
    category: "Agriculture & Java",
    featured: false,
    visual: "orbit",
    accent: "mint",
    githubUrl: "https://github.com/naveenkumar-fsd/soil-nutrient-analysis",
    liveUrl: "",
  },
  {
    id: "almi-gym-website",
    title: "ALMI Gym Website",
    problem:
      "Gym visitors need a clear way to explore fitness programs, membership information, and services.",
    description:
      "A fitness website focused on presenting gym services, training programs, and membership information through a responsive user interface.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
    ],
    category: "Fitness · Frontend Website",
    featured: false,
    visual: "waves",
    accent: "rose",
    githubUrl: "https://github.com/naveenkumar-fsd/ALMI-FITNESS-PROJECT",
    liveUrl: "",
  },
  {
    id: "propulse-crm",
    title: "Propulse — Real Estate CRM",
    problem:
      "Real estate teams need an organized way to manage property enquiries and customer relationships.",
    description:
      "A real estate CRM website focused on presenting property information and organizing customer enquiries and sales workflows through a modern interface.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Real Estate · CRM",
    featured: false,
    visual: "grid",
    accent: "cyan",
    githubUrl: "https://github.com/naveenkumar-fsd/pulse-property-pro",
    liveUrl: "",
  },

  {
  id: "chronos-3d-watch",
  title: "CHRONOS — 3D Watch Experience",

  problem:
    "Luxury watch brands need an engaging digital experience to showcase their products with interactive 3D visuals and animations.",

  description:
    "An immersive luxury watch website featuring an interactive 3D watch model, 360-degree rotation, scroll-triggered animations, and a premium black-and-gold interface.",

  technologies: [
    "React",
    "TypeScript",
    "Three.js",
    "React Three Fiber",
    "Drei",
    "GSAP",
    "CSS3",
  ],

  category: "Luxury · 3D Web Experience",

  featured: true,

  visual: "grid",

  accent: "cyan",

  githubUrl: "https://github.com/naveenkumar-fsd/chronos-3d-watch-experience",

  liveUrl: "https://chronos-3d-watch-experience.vercel.app/",
},
],


  // ---------- Experience  ----------
  experience: [
    {
      id: "almi-digital-marketing",
      company: "ALMI Digital Marketing",
      role: "Web Developer Intern",
      type: "Internship",
      period: "2025-2026",
      summary:
        "Role: Built a full-stack web application for a digital marketing product.",
      responsibilities: [
        "Built and maintained React screens backed by Spring Boot endpoints.",
        "Collaborated with a team of developers to deliver a high-quality product.",
        "Reviewed pull requests and documented API behaviour for teammates.",
      ],
      technologies: ["React", "TypeScript", "Java", "Spring Boot", "MySQL","Docker", "Git"],
    },
    {
      id: "greens-technologies",
      company: "Greens Technologies",
      role: "Java Full Stack Development Trainee",
      type: "Training",
      period: "2025",
      summary: "Training: Java Full Stack Development.",
      responsibilities: [
        "Practiced building frontend interfaces using React.",
        "Learned Spring Boot and REST API development through hands-on exercises and projects.",
        "Collaborated with peers on small group projects to simulate real-world development scenarios.",
      ],
      technologies: ["HTML & CSS", "JavaScript", "React", "Bootstrap","Java", "Spring Boot", "Git"],
    },

  ],

  // ---------- Education & certifications (ALL FICTIONAL) ----------
  education: [
    {
      id: "sample-degree",
      degree: "B.Tech in Agricultural Engineering",
      institution: "KIT-Kalaignarkarunanidhi Institute of Technology, Coimbatore",
      period: "2020 — 2024" ,
    },
    {
      id: "sample-degree",
      degree: "Secondary School Leaving Certificate",
      institution: "Lion's Matriculation Higher Secondary School, Ponnamaravathi",
      period: "2018 — 2020",
    },
    {
      id: "sample-degree",
      degree: "High School Leaving Certificate",
      institution: "Lion's Matriculation Higher Secondary School, Ponnamaravathi",
      period: "2016 — 2018",
    },
    
  ],
  certifications: [
    {
      id: "sample-cert-web",
      title: "Object oriented Programming with Java",
      issuer: "Great Learning",
      year: "2025",
      // url: "https://..."  ← add a real credential link here if you have one; omit it to hide the button
    },
    {
      id: "sample-cert-react",
      title: "Java Full Stack Development",
      issuer: "Greens Technologies",
      year: "2025",
    },
    {
      id: "sample-cert-java",
      title: "Javascript for FrontEnd Engineers", 
      issuer: "CodeSignal",
      year: "2025",
    },
    {
      id: "sample-cert-react",
      title: "Introduction to FrontEnd Development",
      issuer: "CodeSignal",
      year: "2025",
    },
  ],

  // ---------- Process ----------
  process: [
    {
      id: "understand",
      title: "Understand",
      description: "Ask what problem is really being solved, and for whom, before touching code.",
      icon: "search",
    },
    {
      id: "plan",
      title: "Plan",
      description: "Sketch the data model and screens, then cut the scope to the smallest useful slice.",
      icon: "map",
    },
    {
      id: "build",
      title: "Build & test",
      description: "Ship in small steps with tests, so every change is easy to review and undo.",
      icon: "code",
    },
    {
      id: "deliver",
      title: "Refine & deliver",
      description: "Polish performance and accessibility, deploy, then learn from real usage.",
      icon: "rocket",
    },
  ],

  // ---------- Contact ----------
  contact: {
    headline: "Let's build something worth using.",
    text: "Looking for a developer or have a project in mind? Feel free to reach out. I'm always open to connecting, learning, and exploring new opportunities in Java Full Stack Development.",
    ctaLabel: "Email me",
    emailSubject: "Hello from your portfolio",
    emailBody: "Hi Naveenkumar,\n\nI came across your portfolio and wanted to get in touch about...\n",
  },

  // ---------- Section headings ----------
  sections: {
    about: {
      eyebrow: "01 / About",
      title: "A Developer who likes the whole stack.",
    },
    skills: {
      eyebrow: "02 / Skills",
      title: "Tools I reach for.",
      intro: "Grouped by where they are used. No progress bars: the projects below show how I use them.",
    },
    projects: {
      eyebrow: "03 / Projects",
      title: "Selected work.",
      intro: "Sample projects rendered from a single data array. Add one and a new card appears.",
    },
    experience: {
      eyebrow: "04 / Experience",
      title: "Where I have worked.",
      // intro: "Entirely fictional sample entries.",
    },
    education: {
      eyebrow: "05 / Learning",
      title: "Education & certifications.",
    },
    process: {
      eyebrow: "06 / Process",
      title: "How I work.",
      intro: "Four steps, repeated until the thing is good.",
    },
  },

  footerNote:
    "All rights reserved.",
};
