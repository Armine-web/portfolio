export type CVData = {
  name: string;
  role: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    telegram: string;
  };
  techStack: {
    languages: string[];
    frameworks: string[];
    stateManagement: string[];
    uiLibraries: string[];
    tools: string[];
    design: string[];
    additional: string[];
  };
  experience: {
    role: string;
    company: string;
    period: string;
    responsibilities: string[];
  }[];
  education: {
    title: string;
    institution: string;
    period: string;
    description?: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  businessStatus: string;
};

export const cvData: CVData = {
  name: "Armine Aghajanyan",
  role: "Front-End Developer (React, JavaScript, TypeScript)",
  location: "Vanadzor, Lori, Armenia",
  contact: {
    phone: "(+374) 77 47 48 51",
    email: "armine.aghajanyan123@gmail.com",
    github: "https://github.com/Armine-web",
    linkedin: "https://linkedin.com/in/armine-aghajanyan",
    telegram: "@A_Arminka"
  },
  techStack: {
    languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    frameworks: ["React.js", "Next.js", "Context API"],
    stateManagement: ["TanStack Query (React Query)", "Redux Toolkit", "REST API"],
    uiLibraries: ["Tailwind CSS", "Material UI", "Ant Design", "Bootstrap", "BEM"],
    tools: ["Git", "GitHub", "Vercel", "Vite"],
    design: ["Figma", "Adobe Photoshop"],
    additional: ["i18n (Internationalization)", "Adaptive & Responsive Web Design", "React Hooks (useState, useEffect, useMemo, useCallback)", "SPA Architecture"]
  },
  experience: [
    {
      role: "Front-End Developer (Freelance)",
      company: "KWORK & other freelance platforms",
      period: "August 2022 – Present",
      responsibilities: [
        "Development of modern and adaptive web applications: landing pages, SPAs, and small e-commerce projects.",
        "Implementation of full SPA applications using React, Vite, and Next.js.",
        "Global state management using Redux Toolkit and Context API.",
        "Server state and async data management with TanStack Query (caching, auto-refetching).",
        "REST API integration using Axios and Fetch (mock API usage when needed).",
        "Implementation of multi-language functionality (i18n).",
        "Building accessible interfaces using MUI, Ant Design, and Tailwind CSS."
      ]
    },
    {
      role: "Intern / Junior Web Developer",
      company: "Payotto Technologies",
      period: "January 2022 – January 2023",
      responsibilities: [
        "Developing adaptive interfaces with Bootstrap and custom CSS.",
        "Implementing business logic and interactivity with JavaScript.",
        "Working with PHP and MySQL for data retrieval and updates.",
        "Frontend-backend integration for web forms.",
        "Website content management via WordPress admin panel."
      ]
    }
  ],
  education: [
    {
      title: "Level Up React 19",
      institution: "Frontend Masters",
      period: "May 2025 – September 2025",
      description: "React 19, Next.js, TypeScript, Redux Toolkit, Prisma, PostgreSQL"
    },
    {
      title: "React JS Course",
      institution: "Mehryan Foundation",
      period: "February 2024 – April 2025",
      description: "React, Hooks, React Router, Vite, JWT, Redux Toolkit, Jest"
    },
    {
      title: "Web Development Bootcamp",
      institution: "Armenia Workforce Development Program (USAID)",
      period: "February 2022 – April 2022",
      description: "HTML, CSS, Bootstrap, JavaScript Fundamentals, Git"
    },
    {
      title: "Master of Economics",
      institution: "Vanadzor State University",
      period: "1998 – 2003",
      description: "Specialization in Economic Education"
    }
  ],
  languages: [
    { name: "Armenian", level: "Native" },
    { name: "English", level: "B2 (Upper Intermediate)" },
    { name: "Russian", level: "C1 (Advanced)" }
  ],
  businessStatus: "Individual Entrepreneur (ԱՁ)"
};