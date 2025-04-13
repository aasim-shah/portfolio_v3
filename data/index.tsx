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
  //fiver / upwork and github only
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
    value: 45,
  },
  {
    id: 2,
    title: "Year of Experience",
    value: 5,
  },
  {
    id: 3,
    title: "Completed Projects",
    value: 40,
  },
  // {
  //   id: 4,
  //   title: "Awards Received",
  //   value: 6,
  // },
];
export const myExperience: myExperienceTypes[] = [
  {
    id: 1,
    year: "2024 - Present",
    title: "Senior MERN Stack Developer",
    company: "Dcodax PVT LTD",
    label: "Tech Firm",
    description:
      "Developing scalable APIs for a multi-vendor hotel management system, integrating third-party services, and optimizing performance.",
    link: "dcodax.com",
    logo: dcodaxIcon,
  },
  {
    id: 2,
    year: "2022 - 2024",
    title: "MERN Stack Developer (Backend)",
    company: "ItecExperts",
    label: "Software House",
    description:
      "Built and optimized backend systems for multiple web and cross-platform applications, ensuring high performance and security.",
    link: "itecexperts.com",
    logo: itecExpertsIcon,
  },
  // add more experience here ( remote job with 47apps as Backend develooper )
  {
    id: 3,
    year: "2020 - 2022",
    title: "Backend Developer",
    company: "47apps",
    label: "Software House",
    description:
      "Developed and maintained backend systems for a variety of web applications, including e-commerce platforms and content management systems.",
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
    title: "Fastify",
    description: "High-Performance Backend ",
    logo: "https://fastify.dev/img/logos/fastify-white.svg",
    link: "https://www.fastify.io",
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
    title: "PostgreSQL",
    description: "Relational Database",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    link: "https://www.postgresql.org",
  },
  {
    id: 7,
    title: "Docker",
    description: "Containerization Platform",
    logo: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    link: "https://www.docker.com",
  },
  {
    id: 8,
    title: "TypeScript",
    description: "Strongly Typed JavaScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    link: "https://www.typescriptlang.org",
  },
  {
    id: 9,
    title: "GraphQL",
    description: "API Query Language",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
    link: "https://graphql.org",
  },
  {
    id: 10,
    title: "CI/CD",
    description: "Continuous Integration & Deployment",
    logo: "https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png",
    link: "https://about.gitlab.com/topics/ci-cd",
  },
];
export const myServices: myServicesTypes[] = [
  {
    id: 1,
    title: "MERN Stack Development",
    description:
      "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js.",
    icon: webDesignIcon,
    link: "/services",
  },
  {
    id: 2,
    title: "API Development",
    description:
      "Designing and developing RESTful and GraphQL APIs for seamless data communication.",
    icon: webDevIcon,
    link: "/services",
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    description:
      "Deploying and managing cloud-based applications with CI/CD pipelines, Docker, and AWS.",
    icon: seoOptIcon,
    link: "/services",
  },
  {
    id: 4,
    title: "Complete Project Development",
    description:
      "End-to-end development including website, admin dashboard, cross-platform mobile app in Flutter, and AWS deployment.",
    icon: webDesignIcon, // Replace with an appropriate icon
    link: "/services",
  },
];

export const myShowCases: myShowCasesTypes[] = [
  {
    id: 1,
    title: "HOHEAL",
    description:
      "A SaaS-based multi-vendor hotel management system with admin, hotel, management, and staff panels.",
    link: "http://172.86.108.103:4000/en",
    type: "SaaS",
    theme: "Light",
    pages: 30,
    image: hoheal,
  },
  {
    id: 2,
    title: "PIKUP POS",
    description:
      "A full-fledged e-commerce website with a custom admin panel, order management, and payment gateway integration.",
    link: "https://pikuppos.hostdonor.com/",
    type: "E-Commerce",
    theme: "Dark",
    pages: 80,
    image: pos,
  },
  {
    id: 3,
    title: "Premier Vehicles",
    description:
      "A Flutter app with an admin panel where users can list and sell their vehicles, including integrated payment options.",
    link: "github.com/aasim-shah/premier_dashboard",
    type: "Marketplace",
    theme: "Dark",
    pages: 20,
    image: primier,
  },
  {
    id: 4,
    title: "Cloud-Based API Services",
    description:
      "A scalable backend solution with RESTful & GraphQL APIs, authentication, and AWS deployment.",
    link: "https://api.myservice.com",
    type: "Backend",
    theme: "Light",
    pages: 10,
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
      "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js.",
    completedWorks: "50+",
    experience: "5+ years",
    totalHoursWorked: "1500+ hours",
    icon: webDesignIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 2,
    service: "API Development",
    price: "$40+",
    description:
      "Designing and developing RESTful and GraphQL APIs for seamless data communication.",
    completedWorks: "40+",
    experience: "5+ years",
    totalHoursWorked: "1200+ hours",
    icon: webDevIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 3,
    service: "Cloud & DevOps",
    price: "$80+",
    description:
      "Deploying and managing cloud-based applications with CI/CD pipelines, Docker, and AWS.",
    completedWorks: "25+",
    experience: "2+ years",
    totalHoursWorked: "900+ hours",
    icon: seoOptIcon,
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
  {
    id: 4,
    service: "Complete Project Development",
    price: "$30+",
    description:
      "End-to-end development including website, admin dashboard, cross-platform mobile app in Flutter, and AWS deployment.",
    completedWorks: "20+",
    experience: "5+ years",
    totalHoursWorked: "2000+ hours",
    icon: webDesignIcon, // Replace with a more relevant icon if needed
    link: "https://www.upwork.com/freelancers/aasimshah",
  },
];

export const faqData: FAQ[] = [
  {
    question: "Can you work with clients remotely?",
    answer:
      "Absolutely! I have experience working with clients from all around the world. Through effective communication channels such as email, video calls, and project management tools, I ensure seamless collaboration regardless of geographical location.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely! Mobile responsiveness is a top priority in today's digital landscape. I design and develop websites that are fully responsive and adaptable to various devices and screen sizes. Your website will provide an optimal user experience whether accessed via desktops, smartphones, or tablets.",
  },
  {
    question: "How long does it typically take to complete a project?",
    answer:
      "The timeline for each project varies depending on its scope and complexity. Factors such as the number of pages, functionalities, and the client feedback process can impact the timeline. Upon discussing your project requirements, I will provide you with a realistic timeline and keep you updated throughout the process.",
  },
  {
    question: "Can you integrate third-party tools into my website?",
    answer:
      "Yes, I have experience integrating various third-party tools, plugins, and platforms into websites. Whether you need to integrate e-commerce functionalities, social media integration, email marketing services, or anything else, I can recommend and help ensure smooth integration.",
  },
  {
    question: "Do you offer website maintenance?",
    answer:
      "Yes, I offer website maintenance services to ensure your website remains up to date, secure, and optimized. From performance updates to adding new features and content, I can provide ongoing support to keep your website running smoothly.",
  },
  {
    question: "How do you handle website revisions?",
    answer:
      "I value your input and collaboration throughout the design process. Upon completing an initial design, I encourage you to provide feedback. I incorporate your suggestions and revisions to ensure the final product aligns with your vision.",
  },
  {
    question: "Can you optimize my website?",
    answer:
      "Certainly! I incorporate search engine optimization (SEO) best practices into my development process. This includes using relevant keywords, optimizing meta tags, creating search-engine-friendly URLs, and ensuring your website has a solid foundation for better search engine visibility.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "Payment terms may vary depending on the project scope and duration. Generally, I request an initial deposit before commencing work.",
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
    url: "https://www.linkedin.com/",
    icon: linkedInIcon,
  },
];
