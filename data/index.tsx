import { Mail, User, Zap } from "lucide-react";
import {
  client_1,
  client_2,
  client_3,
  client_4,
  discord,
  itecExpertsIcon,
  fiverr,
  dcodaxIcon,
  dribble,
  facebook,
  instagramIcon,
  linkedInIcon,
  hoheal,
  nextjsIcon,
  pos,
  primier,
  pinterest,
  seoOptIcon,
  snapchat,
  spotify,
  webDesignIcon,
  webDevIcon,
  XLogo,
} from "@/app/assets/assets";
import { Github } from "lucide-react";
import { SiUpwork } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";

import {
  counterListsType,
  FAQ,
  FollowerData,
  myExperienceTypes,
  myServicesPlansTypes,
  myServicesTypes,
  myShowCasesTypes,
  myStackTypes,
  socialBrandsTypes,
  testimonialsTypes,
} from "@/types";
import { socialListsTypes } from "@/types";
import { pagesListsType } from "@/types";

export const pagesLists: pagesListsType[] = [
  {
    id: 1,
    title: "Home",
    href: "/",
    icon: <User />,
  },
  {
    id: 2,
    title: "Services",
    href: "/services",
    icon: <Zap />,
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact",
    icon: <Mail />,
  },
];

export const socialLists: socialListsTypes[] = [
  {
    id: 1,
    title: "Fiverr",
    icon: <TbBrandFiverr size={22} />,
    link: "https://www.fiverr.com/users/aaasimmshah",
  },
  {
    id: 2,
    title: "Upwork",
    icon: <SiUpwork size={22} />,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 3,
    title: "Github",
    icon: <Github size={22} />,
    link: "https://www.github.com/aasim-shah",
  },
];

export const socialBrands: socialBrandsTypes[] = [
  {
    id: 1,
    name: "Discord",
    icon: discord,
    link: "https://discord.com",
  },
  {
    id: 2,
    name: "Dribbble",
    icon: dribble,
    link: "https://dribbble.com",
  },
  {
    id: 3,
    name: "Facebook",
    icon: facebook,
    link: "https://facebook.com",
  },
  {
    id: 4,
    name: "Pinterest",
    icon: pinterest,
    link: "https://pinterest.com",
  },
  {
    id: 5,
    name: "SnapChat",
    icon: snapchat,
    link: "https://snapchat.com",
  },
  {
    id: 6,
    name: "Spotify",
    icon: spotify,
    link: "https://open.spotify.com",
  },
];

export const counterLists: counterListsType[] = [
  {
    id: 1,
    title: "Happy Clients",
    value: 100,
  },
  {
    id: 2,
    title: "Year of Experience",
    value: 5,
  },
  {
    id: 3,
    title: "Completed Projects",
    value: 80,
  },
];

export const myExperience: myExperienceTypes[] = [
  {
    id: 1,
    year: "Oct 2025 - Present",
    title: "MERN Stack Developer",
    company: "Appworks",
    label: "Islamabad, PK",
    description:
      "Developed secure backend APIs for eEagle VPN (1.4M+ downloads). Built Super Admin Dashboard for VPN server management. Automated VPN server provisioning with Node.js, Bash, and Linux automation. Set up Grafana monitoring for 60+ production servers. Built and deployed eEagle VPN Chrome Extension.",
    link: "https://appworks.com",
    logo: dcodaxIcon,
  },
  {
    id: 2,
    year: "Sep 2024 - Sep 2025",
    title: "MERN Stack Developer",
    company: "Dcodax Pvt Ltd",
    label: "Islamabad, PK",
    description:
      "Developed RESTful APIs for multi-vendor hotel management SaaS (Hoheal) with real-time staff-guest chat. Built PIKUP POS restaurant automation with QR ordering and Flutter apps. Delivered Ajar rental platform with Stripe payments. Created Bite.md multi-vendor marketplace with MAIB payment gateway integration.",
    link: "http://dcodax.com",
    logo: dcodaxIcon,
  },
  {
    id: 3,
    year: "July 2023 - Aug 2024",
    title: "MERN Stack Developer",
    company: "ItecExperts Pvt Ltd",
    label: "Peshawar, PK",
    description:
      "Engineered backend APIs for Flutter apps including marketplaces, automation tools, e-commerce, and chat solutions. Built advanced messaging platform with Socket.io. Optimized MySQL and MongoDB databases. Implemented Stripe payment solutions. Managed AWS deployment and CI/CD pipelines with GitHub Actions.",
    link: "https://itecexperts.com",
    logo: itecExpertsIcon,
  },
  {
    id: 4,
    year: "Feb 2021 - June 2023",
    title: "Backend Developer",
    company: "47Apps Company",
    label: "Remote, US",
    description:
      "Engineered backend APIs for Flutter apps, websites, and admin dashboards. Launched multi-vendor service marketplace on AWS. Created sophisticated chat system for vendor-user and community interactions. Integrated Stripe payment solutions securing transactions.",
    link: "",
    logo: fiverr,
  },
];

export const myStack: myStackTypes[] = [
  {
    id: 1,
    title: "Next.js",
    description: "Full-Stack React Framework",
    logo: nextjsIcon,
    link: "https://nextjs.org",
  },
  {
    id: 2,
    title: "Node.js",
    description: "JavaScript Runtime",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    link: "https://nodejs.org",
  },
  {
    id: 3,
    title: "Express.js",
    description: "Fast Node.js Framework",
    logo: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff",
    link: "https://expressjs.com",
  },
  {
    id: 4,
    title: "React.js",
    description: "UI Library",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    link: "https://reactjs.org",
  },
  {
    id: 5,
    title: "MongoDB",
    description: "NoSQL Database",
    logo: "https://www.mongodb.com/assets/images/global/favicon.ico",
    link: "https://www.mongodb.com",
  },
  {
    id: 6,
    title: "MySQL",
    description: "Relational Database",
    logo: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
    link: "https://www.mysql.com",
  },
  {
    id: 7,
    title: "TypeScript",
    description: "Strongly Typed JavaScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    link: "https://www.typescriptlang.org",
  },
  {
    id: 8,
    title: "AWS",
    description: "Cloud Computing Platform",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    link: "https://aws.amazon.com",
  },
  {
    id: 9,
    title: "Docker",
    description: "Containerization",
    logo: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    link: "https://www.docker.com",
  },
  {
    id: 10,
    title: "Socket.io",
    description: "Real-time Communication",
    logo: "https://socket.io/images/logo.svg",
    link: "https://socket.io",
  },
  {
    id: 11,
    title: "Grafana",
    description: "Monitoring & Analytics",
    logo: "https://grafana.com/static/assets/img/fav32.png",
    link: "https://grafana.com",
  },
  {
    id: 12,
    title: "Linux",
    description: "Server Management",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
    link: "https://www.linux.org",
  },
];

export const myServices: myServicesTypes[] = [
  {
    id: 1,
    title: "MERN Stack Development",
    description:
      "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js with 5+ years of experience.",
    icon: webDesignIcon,
    link: "/services",
  },
  {
    id: 2,
    title: "API Development & Integration",
    description:
      "Designing RESTful APIs, GraphQL endpoints, and integrating third-party services including Stripe, OpenAI, and payment gateways.",
    icon: webDevIcon,
    link: "/services",
  },
  {
    id: 3,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Server automation, VPN infrastructure, CI/CD pipelines, monitoring with Grafana, and deployment on AWS, DigitalOcean, and Hetzner.",
    icon: seoOptIcon,
    link: "/services",
  },
  {
    id: 4,
    title: "SaaS Product Development",
    description:
      "End-to-end SaaS development including multi-tenant architecture, admin dashboards, Chrome extensions, and mobile app backends.",
    icon: webDesignIcon,
    link: "/services",
  },
];

export const myShowCases: myShowCasesTypes[] = [
  {
    id: 1,
    title: "eEagle VPN",
    description:
      "Secure backend APIs and Super Admin Dashboard for VPN management. Handles 1.4M+ downloads with automated server provisioning and Grafana monitoring for 60+ servers.",
    link: "https://play.google.com/store/apps/details?id=com.eeagle.vpn",
    type: "VPN/SaaS",
    theme: "Dark",
    pages: 50,
    image: pos,
  },
  {
    id: 2,
    title: "PIKUP POS",
    description:
      "Complete restaurant automation with QR table ordering, real-time POS sync, Flutter mobile apps, and Next.js dashboards for Super Admin and Vendors.",
    link: "https://pikuppos.hostdonor.com/",
    type: "E-Commerce/POS",
    theme: "Dark",
    pages: 80,
    image: pos,
  },
  {
    id: 3,
    title: "HOHEAL - Hotel Management SaaS",
    description:
      "Multi-vendor hotel management system with service request handling, real-time staff-guest chat, and comprehensive admin panels. Onboarded 50+ hotels.",
    link: "http://172.86.108.103:4000/en",
    type: "SaaS",
    theme: "Light",
    pages: 60,
    image: hoheal,
  },
  {
    id: 4,
    title: "Fyrebot - AI Chatbot Platform",
    description:
      "SaaS platform for self-serve chatbot creation in under 10 minutes. Multi-tenant API-key architecture with npm widget, React Native plugin, and OpenAI integration.",
    link: "#",
    type: "AI/SaaS",
    theme: "Dark",
    pages: 40,
    image: pos,
  },
  {
    id: 5,
    title: "Premier Vehicles Marketplace",
    description:
      "Comprehensive vehicle marketplace with admin panel enabling 1,000+ listings of cars and bikes. Integrated secure payment options with 30% increase in transactions.",
    link: "github.com/aasim-shah/premier_dashboard",
    type: "Marketplace",
    theme: "Dark",
    pages: 30,
    image: primier,
  },
  {
    id: 6,
    title: "Ajar - Rental Platform",
    description:
      "Multi-vendor rental platform with Stripe payments, dynamic registration with document verification, real-time notifications, and Next.js admin/vendor dashboards.",
    link: "#",
    type: "Marketplace",
    theme: "Light",
    pages: 45,
    image: pos,
  },
];

export const testimonials: testimonialsTypes[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    description:
      "The MERN stack web application Syed built for my business is top-notch! It's fast, scalable, and has completely streamlined our operations.",
    location: "New York City, USA.",
    avatar: client_1,
  },
  {
    id: 2,
    name: "John Anderson",
    description:
      "Syed's API development skills are outstanding! He designed a seamless and efficient RESTful API for our mobile and web apps, making integrations smooth.",
    location: "Sydney, Australia.",
    avatar: client_2,
  },
  {
    id: 3,
    name: "Mark Davis",
    description:
      "From backend optimization to cloud deployment, Syed handled our entire project flawlessly. Our platform is now running with excellent performance on AWS.",
    location: "London, UK.",
    avatar: client_3,
  },
  {
    id: 4,
    name: "Laura Adams",
    description:
      "Syed delivered a full-stack solution, including a responsive website, an admin dashboard, and a cross-platform Flutter app. The end-to-end development was executed perfectly!",
    location: "Madrid, Spain.",
    avatar: client_4,
  },
];

export const myServicesPlans: myServicesPlansTypes[] = [
  {
    id: 1,
    service: "MERN Stack Development",
    price: "$30",
    description:
      "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js with proven expertise.",
    completedWorks: "80+",
    experience: "5+ years",
    totalHoursWorked: "3000+ hours",
    icon: webDesignIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 2,
    service: "API Development & Integration",
    price: "$35",
    description:
      "Designing RESTful and GraphQL APIs with third-party integrations including Stripe, OpenAI, and payment gateways.",
    completedWorks: "60+",
    experience: "5+ years",
    totalHoursWorked: "2000+ hours",
    icon: webDevIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 3,
    service: "Cloud Infrastructure & DevOps",
    price: "$40",
    description:
      "Server automation, VPN infrastructure, CI/CD pipelines, monitoring with Grafana. Managing 60+ production servers.",
    completedWorks: "40+",
    experience: "3+ years",
    totalHoursWorked: "1500+ hours",
    icon: seoOptIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 4,
    service: "SaaS Product Development",
    price: "$35",
    description:
      "Complete SaaS development with multi-tenant architecture, admin dashboards, Chrome extensions, and mobile backends.",
    completedWorks: "30+",
    experience: "4+ years",
    totalHoursWorked: "2500+ hours",
    icon: webDesignIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
];

export const faqData: FAQ[] = [
  {
    question: "Can you work with clients remotely?",
    answer:
      "Absolutely! I have 5+ years of experience working with clients from all around the world, including US-based companies. Through effective communication channels such as email, video calls, Slack, and project management tools, I ensure seamless collaboration regardless of geographical location.",
  },
  {
    question: "What types of projects do you specialize in?",
    answer:
      "I specialize in MERN stack applications, SaaS platforms, VPN infrastructure, real-time chat systems, payment gateway integrations, multi-vendor marketplaces, POS systems, and backend APIs for mobile apps. I've worked on projects ranging from hotel management systems to VPN services with millions of users.",
  },
  {
    question: "How long does it typically take to complete a project?",
    answer:
      "The timeline varies depending on project scope and complexity. Simple APIs can take 1-2 weeks, while complex SaaS platforms may take 2-4 months. Upon discussing your requirements, I'll provide a realistic timeline with milestones and keep you updated throughout the process.",
  },
  {
    question: "Can you handle server infrastructure and deployment?",
    answer:
      "Yes! I have extensive experience with AWS, DigitalOcean, Hetzner, and other cloud providers. I can set up and manage production servers, implement CI/CD pipelines, configure monitoring with Grafana, and handle automated server provisioning. I currently manage 60+ production servers.",
  },
  {
    question: "Do you integrate third-party services and payment gateways?",
    answer:
      "Absolutely! I have extensive experience integrating Stripe, MAIB, OpenAI APIs, Socket.io for real-time features, and various other third-party services. I ensure secure, reliable, and optimized integrations that meet industry standards.",
  },
  {
    question: "Can you build Chrome extensions and browser tools?",
    answer:
      "Yes! I've built multiple Chrome extensions including VPN tools and email schedulers. I'm proficient with Chrome Extension Manifest V3, background workers, and secure proxy configurations.",
  },
  {
    question: "Do you offer maintenance and support?",
    answer:
      "Yes, I offer ongoing maintenance and support services to ensure your application remains secure, updated, and optimized. This includes bug fixes, feature additions, performance optimization, and 24/7 monitoring for critical systems.",
  },
  {
    question: "What is your development approach?",
    answer:
      "I follow agile methodology with regular updates and iterations. I use Git for version control, implement CI/CD pipelines for automated testing and deployment, write clean and documented code, and ensure scalability and security from the ground up.",
  },
];

export const followerData: FollowerData[] = [
  {
    platform: "twitter",
    followers: "2.1K",
    url: "https://twitter.com/",
    icon: XLogo,
  },
  {
    platform: "Instagram",
    followers: "1.3K",
    url: "https://www.instagram.com/",
    icon: instagramIcon,
  },
  {
    platform: "LinkedIn",
    followers: "2.5K",
    url: "https://www.linkedin.com/in/aasimshah",
    icon: linkedInIcon,
  },
];
