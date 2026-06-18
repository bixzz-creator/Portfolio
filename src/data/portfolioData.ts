import { PortfolioData } from "./types";

export const portfolioData: PortfolioData = {
  personal: {
    name: "Sharukesh A",
    title: "B.Tech Information Technology Student",
    bio: "Enthusiastic learner passionate about developing innovative solutions and dedicated to achieving technical excellence. Possesses strong logical skills enabling effective solving of complex problems.",
    location: "Coimbatore, India",
    email: "sharukeshb@gmail.com",
    phone: "+91 9944168196",
    avatar: "/avatar.jpg", 
    headerImage: "/header-bg.jpg", 
    tagline: "Developing innovative solutions with technical excellence."
  },

  education: [
    {
      id: "edu-1",
      institution: "Dr. N.G.P Institute of Technology, Coimbatore",
      degree: "B.Tech",
      field: "Information Technology",
      graduationYear: "2022 – 2026",
      gpa: "8.32 CGPA",
      imageUrl: "/education/dr-ngp.png",
      highlights: [
        "Specialized in AI/ML, IoT, and Full-Stack Development",
        "Participated in Code Debugging competitions & technical symposiums",
        "Developed multiple real-world projects including AgriVaani and Face ID systems",
        "Active member in Speed Maths & Shortcut Techniques events"
      ]
    },
    {
      id: "edu-2",
      institution: "Little Scholars Matric Higher Secondary School",
      degree: "Higher Secondary Certificate (HSC)",
      field: "Computer Science",
      graduationYear: "2020 – 2022",
      gpa: "74%",
      imageUrl: "/education/little-scholars.png",
      highlights: [
        "Focused on Computer Science and Mathematics",
        "Built strong foundation in logical reasoning and problem solving"
      ]
    },
    {
      id: "edu-3",
      institution: "St Mary's Matriculation School",
      degree: "Secondary School Leaving Certificate (SSLC)",
      graduationYear: "2020",
      gpa: "71%",
      imageUrl: "/education/st-marys.png",
      highlights: [
        "Developed early interest in technology and computing"
      ]
    }
  ],

  skills: {
    "Programming Languages": ["Java"],
    "Web Development": ["HTML", "CSS", "JavaScript"],
    "Frameworks & APIs": ["REST APIs", "Object-Oriented Programming (OOP)"],
    "Database Management": ["SQL", "MongoDB"],
    "Tools & Platforms": ["Git", "GitHub", "Arduino IDE", "VS Code", "Microsoft Office"],
    "Soft Skills": ["Team Work", "Adaptability", "Time management", "Critical Thinking", "Problem Solving"]
  },

  projects: [
    {
      id: "proj-1",
      title: "AgriVaani - AI Powered Smart Agriculture Advisory System",
      longDescription: "AgriVaani is a comprehensive agriculture advisory system that leverages AI, NLP, and Deep Learning to empower farmers with actionable insights. The app features crop prediction using machine learning models, real-time weather forecasting, and plant disease detection through image analysis. Built with a focus on accessibility, it supports multiple languages to reach farmers across different regions.",
      technologies: ["AI", "NLP", "DeepLearning", "AppDevelopment"],
      imageUrl: "/projects/agrivaani.jpg",
      links: {
        github: "https://github.com/bixzz-creator",
      },
    },
    {
      id: "proj-2",
      title: "Wheelchair Fall Detection System",
      longDescription: "This IoT-based safety system uses sensors to monitor wheelchair orientation and detect potential falls in real-time. When a fall is detected, the system immediately triggers SMS alerts to caregivers and emergency contacts, ensuring rapid response. The project demonstrates practical application of IoT technology for healthcare and accessibility.",
      technologies: ["IoT", "SMS Alerts"],
      imageUrl: "/projects/wheelchair.jpg",
      links: {
        github: "https://github.com/bixzz-creator",
      },
    },
    {
      id: "proj-3",
      title: "Smart Campus Cleanliness Management System",
      longDescription: "A digital platform that streamlines campus cleanliness management using machine learning-based image detection. The system allows users to report cleanliness issues through an app, which then uses ML models to classify and prioritize areas needing attention. This helps campus management allocate resources efficiently and maintain a clean environment.",
      technologies: ["App Development", "Machine Learning"],
      imageUrl: "/projects/campus.jpg",
      links: {
        github: "https://github.com/bixzz-creator/sccms-app",
      },
    },
    {
      id: "proj-4",
      title: "Unique Face Identification Using AI & ML",
      longDescription: "A cutting-edge face identification system that combines multiple AI/ML technologies for real-time face detection and recognition. The system uses YOLOv5/YOLOv8 for face detection, ArcFace for generating face embeddings, and DeepSort for multi-object tracking. An identity verification system was implemented leveraging state-of-the-art AI models for accurate and reliable recognition across varied conditions.",
      technologies: ["Python", "YOLOv8", "ArcFace", "DeepSort"],
      imageUrl: "/projects/face-id.png",
      links: {
        github: "https://github.com/bixzz-creator/Face-Detection-using-AI-and-ML",
      },
    },
    {
      id: "proj-5",
      title: "Real-Time Currency Converter",
      longDescription: "A modern, responsive web application developed to perform instantaneous global currency conversions. The app utilizes HTML5, CSS3, and JavaScript, integrating a third-party REST API to retrieve and process live exchange rate data with a clean user interface.",
      technologies: ["HTML", "CSS", "JavaScript", "REST APIs"],
      imageUrl: "/projects/currency-converter.png",
      links: {
        github: "https://github.com/bixzz-creator/Currency_Converter",
      },
    }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Human-Computer Interaction",
      issuer: "NPTEL",
      issuedDate: "2025",
      score: "83%"
    },
    {
      id: "cert-2",
      name: "IoT and Web 4.0",
      issuer: "NPTEL",
      issuedDate: "2024",
      score: "67%"
    },
    {
      id: "cert-3",
      name: "Oracle Cloud Infrastructure Foundation",
      issuer: "Oracle",
      issuedDate: "2023"
    }
  ],

  githubRepos: [],

  experience: [
    {
      id: "exp-1",
      company: "One Data Software Solutions",
      position: "Frontend Development Intern",
      duration: "2024 · 15 Days",
      description: "Completed a focused internship on frontend development, gaining practical experience in building responsive web interfaces.",
      achievements: [
        "Built responsive web interfaces using modern frontend technologies",
        "Developed a real-time Currency Converter web application using HTML, CSS, and JavaScript",
        "Gained hands-on experience with real-world development workflows",
        "Collaborated with the development team on client projects"
      ]
    }
  ],

  social: {
    linkedin: "https://linkedin.com/in/sharukesha",
    github: "https://github.com/bixzz-creator",
    email: "sharukeshb@gmail.com"
  },

  languages: [
    { name: "Tamil", proficiency: "Native Proficiency" },
    { name: "English", proficiency: "Professional Proficiency" }
  ],

  about: {
    headline: "Information Technology Student & Developer",
    story: "I am an enthusiastic learner passionate about developing innovative solutions. I possess strong logical skills and seek opportunities to leverage my analytical abilities and technical expertise to contribute to dynamic projects. My recent activities include participating in Speed Maths & Shortcut Techniques, Code Debugging competitions, and various technical symposiums.",
    personalInterests: [
      "Competitive Programming",
      "IoT Projects",
      "Machine Learning"
    ],
    availability: "Available for internships and entry-level roles"
  }
};
