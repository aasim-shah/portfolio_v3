import { BookOpen, FolderKanban, Info, Mail, User, Zap } from "lucide-react";
import {
  discord,
  itecExpertsIcon,
  AvatarMe,
  dcodaxIcon,
  dribble,
  facebook,
  instagramIcon,
  linkedInIcon,
  hoheal,
  nextjsIcon,
  pos,
  primier,
  project_1,
  project_2,
  project_3,
  project_4,
  pinterest,
  seoOptIcon,
  snapchat,
  spotify,
  webDesignIcon,
  webDevIcon,
  XLogo,
} from "@/app/assets/assets";
import { Github, Instagram, Linkedin } from "lucide-react";

import {
  blogPostType,
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
    title: "Projects",
    href: "/projects",
    icon: <FolderKanban />,
  },
  {
    id: 3,
    title: "About",
    href: "/about",
    icon: <Info />,
  },
  {
    id: 4,
    title: "Services",
    href: "/services",
    icon: <Zap />,
  },
  {
    id: 5,
    title: "Contact",
    href: "/contact",
    icon: <Mail />,
  },
  {
    id: 6,
    title: "Blogs",
    href: "/blogs",
    icon: <BookOpen />,
  },
];

export const blogPosts: blogPostType[] = [
  {
    id: 1,
    title: "How I Build Scalable MERN Stack Applications for Real Clients",
    excerpt:
      "A practical breakdown of the architecture, development flow, and deployment patterns I use to ship stable MERN products that grow with the business.",
    category: "MERN Stack",
    publishedAt: "March 12, 2025",
    date: "2025-03-12",
    readTime: "6 min read",
    slug: "scalable-mern-stack-applications",
  },
  {
    id: 2,
    title: "What It Takes to Manage Production APIs and Cloud Infrastructure",
    excerpt:
      "From CI/CD pipelines to monitoring and server automation, this post covers the systems thinking required to keep modern backend platforms reliable in production.",
    category: "Cloud & DevOps",
    publishedAt: "February 21, 2025",
    date: "2025-02-21",
    readTime: "7 min read",
    slug: "production-apis-cloud-infrastructure",
  },
  {
    id: 3,
    title: "Designing SaaS Backends That Are Flexible, Secure, and Easy to Extend",
    excerpt:
      "Key lessons from building SaaS products with multi-tenant architecture, role-based access, payment integrations, and maintainable backend services.",
    category: "SaaS",
    publishedAt: "January 30, 2025",
    date: "2025-01-30",
    readTime: "5 min read",
    slug: "designing-flexible-saas-backends",
  },
  {
    id: 4,
    title: "Running a 45-Server WireGuard VPN Fleet: Provisioning, Monitoring, and Failure",
    excerpt:
      "How I automate provisioning, roll out configuration, and watch fleet health for a consumer VPN running 45+ WireGuard servers across 20+ regions.",
    category: "Cloud & DevOps",
    publishedAt: "April 15, 2026",
    date: "2026-04-15",
    readTime: "8 min read",
    slug: "wireguard-vpn-fleet-operations",
  },
  {
    id: 5,
    title: "Integrating Payments Across Stripe and MAIB Without Coupling Your Domain",
    excerpt:
      "A provider-agnostic approach to checkout, webhooks, idempotency, and reconciliation, drawn from shipping Stripe and MAIB integrations in production.",
    category: "Payments",
    publishedAt: "June 10, 2026",
    date: "2026-06-10",
    readTime: "7 min read",
    slug: "payment-gateway-abstraction-stripe-maib",
  },
  {
    id: 6,
    title: "Real-Time Messaging at Scale with Socket.io: Rooms, Delivery, and Backpressure",
    excerpt:
      "Design notes from building a Socket.io messaging platform with file transfers, forwarding, and reactions on top of MySQL and MongoDB data models.",
    category: "Real-time",
    publishedAt: "July 22, 2026",
    date: "2026-07-22",
    readTime: "7 min read",
    slug: "realtime-messaging-socketio-scale",
  },
  {
    id: 7,
    title: "Shipping a Browser Extension That Talks to Your Backend: The eEagle VPN Chrome Extension",
    excerpt:
      "What it takes to extend a production backend to the browser with a Manifest V3 Chrome extension: auth, service workers, and connection state.",
    category: "Browser Extensions",
    publishedAt: "August 19, 2026",
    date: "2026-08-19",
    readTime: "6 min read",
    slug: "browser-extension-backend-eeagle",
  },
];

export const socialLists: socialListsTypes[] = [
  {
    id: 1,
    title: "Github",
    icon: <Github size={22} />,
    link: "https://www.github.com/aasim-shah",
  },
  {
    id: 2,
    title: "LinkedIn",
    icon: <Linkedin size={22} />,
    link: "https://www.linkedin.com/in/aasimshah/",
  },
  {
    id: 3,
    title: "Instagram",
    icon: <Instagram size={22} />,
    link: "https://www.instagram.com/themistyframes_/",
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
    title: "VPN Servers",
    value: 45,
    suffix: "+",
  },
  {
    id: 2,
    title: "Global Regions",
    value: 20,
    suffix: "+",
  },
  {
    id: 3,
    title: "Mobile Users",
    value: 2,
    suffix: "M+",
  },
  {
    id: 4,
    title: "Products Launched",
    value: 8,
    suffix: "+",
  },
];

export const myExperience: myExperienceTypes[] = [
  {
    id: 1,
    year: "Oct 2025 - Present",
    title: "MERN Stack Developer",
    focus: "Backend & Infrastructure Architecture",
    company: "Appworks",
    label: "Islamabad, PK",
    description:
      "Backend and infrastructure architecture for eEagle VPN and its globally distributed production fleet.",
    highlights: [
      "Architected secure backend APIs and a Super Admin Dashboard for eEagle VPN (2M+ downloads), owning authentication, server allocation, and lifecycle management across 45+ servers in 20+ regions.",
      "Built repeatable infrastructure automation for WireGuard and server provisioning with Node.js, Bash, and a remote script-based deployment pipeline.",
      "Established Grafana and Prometheus observability using Kafka, Docker, Node, and Redis exporters, with alerting for fleet health, uptime, and performance.",
      "Own production security hardening and performance, and shipped the eEagle VPN Chrome Extension for browser-level connectivity.",
    ],
    link: "https://eeaglevpn.com",
    logo: dcodaxIcon,
  },
  {
    id: 2,
    year: "Sep 2024 - Sep 2025",
    title: "MERN Stack Developer",
    focus: "Backend Architecture",
    company: "Dcodax Pvt Ltd",
    label: "Islamabad, PK",
    description:
      "Backend architecture and cross-functional delivery across four production SaaS platforms.",
    highlights: [
      "Architected REST APIs for Hoheal, including multi-vendor hotel workflows, service requests, and real-time staff–guest messaging.",
      "Designed PIKUP POS backend architecture for QR ordering and real-time POS synchronization, plus Ajar rental workflows with Stripe and document-backed registration.",
      "Designed Bite.md backend and MAIB payments, directing React and Flutter delivery across four SaaS products shipped within 12 months.",
    ],
    link: "http://dcodax.com",
    logo: dcodaxIcon,
  },
  {
    id: 3,
    year: "Jul 2023 - Aug 2024",
    title: "MERN Stack Developer",
    company: "ItecExperts Pvt Ltd",
    label: "Peshawar, PK",
    description:
      "Backend engineering for mobile applications, marketplaces, automation tools, commerce, and B2B systems.",
    highlights: [
      "Engineered production APIs powering Flutter apps, marketplaces, automation tools, e-commerce, and B2B products.",
      "Led a Socket.io messaging platform with file transfers, forwarding, and reactions, while optimizing MySQL and MongoDB data models.",
      "Architected subscription and billing workflows and owned AWS and GitHub Actions CI/CD, reducing deployment time by 40%.",
    ],
    link: "https://itecexperts.com",
    logo: itecExpertsIcon,
  },
  {
    id: 4,
    year: "Feb 2021 - Jun 2023",
    title: "Backend Developer",
    company: "47Apps Company",
    label: "Remote, US",
    description:
      "Backend APIs and production infrastructure for mobile, web, marketplace, and real-time products.",
    highlights: [
      "Engineered APIs for Flutter apps, marketing websites, and admin dashboards, and launched a multi-vendor service marketplace on AWS.",
      "Built real-time vendor–user chat and integrated Stripe payment infrastructure, reducing payment errors.",
    ],
    link: "",
    logo: AvatarMe,
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
      "Designing and building production web applications with Node.js, React, Next.js, TypeScript, MongoDB, MySQL, and PostgreSQL.",
    icon: webDesignIcon,
    link: "/services",
  },
  {
    id: 2,
    title: "API Development & Integration",
    description:
      "Architecting secure REST APIs, database models, real-time systems, and integrations for Stripe, MAIB, OpenAI, and other platforms.",
    icon: webDevIcon,
    link: "/services",
  },
  {
    id: 3,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Automating Linux and WireGuard infrastructure, CI/CD, monitoring, and deployments across AWS, DigitalOcean, Contabo, and Gthost.",
    icon: seoOptIcon,
    link: "/services",
  },
  {
    id: 4,
    title: "SaaS Product Development",
    description:
      "Taking multi-tenant products from architecture through launch, including admin dashboards, payments, AI/RAG, and mobile app backends.",
    icon: webDesignIcon,
    link: "/services",
  },
];

export const myShowCases: myShowCasesTypes[] = [
  {
    id: 1,
    title: "FyreWay",
    description:
      "Self-serve infrastructure platform that provisions production-ready VPN servers across 20+ global locations, with automated lifecycle management, SDKs, monitoring, and reliability controls.",
    link: "https://fyreway.com",
    type: "VPN Infrastructure",
    status: "Live",
    technologies: "Node.js · Bash · WireGuard",
    image: project_1,
    slug: "fyreway",
  },
  {
    id: 2,
    title: "eEagle VPN",
    description:
      "Backend and infrastructure architecture for a consumer VPN serving approximately 2M mobile users through 45+ servers in 20+ regions, with automated provisioning and fleet-wide observability.",
    link: "https://eeaglevpn.com",
    type: "VPN Platform",
    status: "Live",
    technologies: "Node.js · WireGuard · Grafana",
    image: project_2,
    slug: "eeagle-vpn",
  },
  {
    id: 3,
    title: "FyreMaps",
    description:
      "Location infrastructure combining maps, routing, search, navigation, geofencing, and geocoding through a single production-ready integration.",
    link: "https://fyremaps.com",
    type: "Location Infrastructure",
    status: "Live",
    technologies: "PostGIS · MapLibre GL · AWS",
    image: project_3,
    slug: "fyremaps",
  },
  {
    id: 4,
    title: "GetRestro",
    description:
      "Multi-tenant restaurant management SaaS combining POS, kitchen display, staff workflows, inventory, online ordering, and real-time analytics for multi-location operators.",
    link: "https://getrestro.com",
    type: "Restaurant SaaS",
    status: "In production",
    technologies: "Next.js · Node.js · Real-time",
    image: pos,
    slug: "getrestro",
  },
  {
    id: 5,
    title: "RunMyPharmacy",
    description:
      "Web-based pharmacy POS and inventory platform with checkout, batch and expiry tracking, reporting, and real-time synchronization, used by 30+ businesses.",
    link: "https://runmypharmacy.com",
    type: "Pharmacy SaaS",
    status: "In production",
    technologies: "POS · Inventory · Real-time",
    image: project_4,
    slug: "runmypharmacy",
  },
  {
    id: 6,
    title: "FeedWink",
    description:
      "Private baby-care app for tracking feeds, sleep, growth, vaccines, and milestones, with AI-assisted health insights and real-time caregiver sharing.",
    link: "https://www.feedwink.com",
    type: "Healthtech",
    status: "Live",
    technologies: "AI Insights · Mobile · Real-time",
    image: project_1,
    slug: "feedwink",
  },
  {
    id: 7,
    title: "FyreBot",
    description:
      "Multi-tenant AI chatbot platform trained on business-provided knowledge, with retrieval-scoped answers and embeddable React, Vue, and JavaScript widgets.",
    link: "https://fyrebot.fyreway.com",
    type: "AI SaaS",
    status: "Live",
    technologies: "RAG · OpenAI · Embeddable SDKs",
    image: project_2,
    slug: "fyrebot",
  },
  {
    id: 8,
    title: "PIKUP POS",
    description:
      "Restaurant automation platform with a Super Admin Dashboard, React website, Flutter apps, custom POS, QR-code table ordering, and real-time synchronization.",
    link: "",
    type: "Restaurant Automation",
    status: "Production deployment",
    technologies: "React · Flutter · POS",
    image: pos,
  },
  {
    id: 9,
    title: "Hoheal",
    description:
      "Hotel management platform with service-request workflows and real-time staff–guest chat, onboarding 50+ hotels during its first six months.",
    link: "",
    type: "Hospitality SaaS",
    status: "Production deployment",
    technologies: "Node.js · Socket.io · SaaS",
    image: hoheal,
  },
  {
    id: 10,
    title: "Ajar",
    description:
      "Multi-vendor rental platform with Stripe payments, document-verification-backed registration, real-time notifications, and dedicated admin and vendor dashboards.",
    link: "",
    type: "Rental Marketplace",
    status: "Client project",
    technologies: "Next.js · Stripe · Node.js",
    image: project_3,
  },
  {
    id: 11,
    title: "Bite.md",
    description:
      "Multi-vendor marketplace spanning pharmacy, grocery, and restaurant ordering, supported by backend architecture and a MAIB payment integration.",
    link: "",
    type: "Multi-vendor Marketplace",
    status: "Client project",
    technologies: "Node.js · MAIB · Marketplace",
    image: project_4,
  },
  {
    id: 12,
    title: "Pizzayolo",
    description:
      "Food-ordering platform for pizza operations with loyalty points, coupons, category and vendor management, real-time order tracking, and web and mobile delivery workflows.",
    link: "",
    type: "Food Ordering",
    status: "Client platform",
    technologies: "Web · Mobile · Real-time",
    image: primier,
  },
  {
    id: 13,
    title: "Papa'sNV",
    description:
      "Multi-vendor food-ordering platform with loyalty, coupon, catalogue, order-tracking, and delivery workflows designed for fast-food operations.",
    link: "",
    type: "Food Ordering",
    status: "Client platform",
    technologies: "Web · Mobile · Real-time",
    image: project_1,
  },
  {
    id: 14,
    title: "FeastFlow",
    description:
      "Food commerce platform supporting vendor and category management, promotional offers, real-time ordering, and end-to-end delivery workflows across web and mobile.",
    link: "",
    type: "Food Ordering",
    status: "Client platform",
    technologies: "Web · Mobile · Real-time",
    image: project_2,
  },
];

export const testimonials: testimonialsTypes[] = [];

export const myServicesPlans: myServicesPlansTypes[] = [
  {
    id: 1,
    service: "MERN Stack Development",
    price: "Custom",
    description:
      "Building scalable and high-performance web applications using MongoDB, Express, React, and Node.js with proven expertise.",
    completedWorks: "Architecture → launch",
    experience: "5+ years",
    totalHoursWorked: "Remote / global",
    icon: webDesignIcon,
    link: "/contact",
  },
  {
    id: 2,
    service: "API Development & Integration",
    price: "Custom",
    description:
      "Designing secure REST APIs, database architecture, and integrations including Stripe, MAIB, OpenAI, and real-time services.",
    completedWorks: "APIs & integrations",
    experience: "5+ years",
    totalHoursWorked: "Project / retainer",
    icon: webDevIcon,
    link: "/contact",
  },
  {
    id: 3,
    service: "Cloud Infrastructure & DevOps",
    price: "Custom",
    description:
      "Server automation, VPN infrastructure, CI/CD, and Grafana and Prometheus monitoring across 45+ production servers.",
    completedWorks: "45+ server fleet",
    experience: "3+ years",
    totalHoursWorked: "Build / managed ops",
    icon: seoOptIcon,
    link: "/contact",
  },
  {
    id: 4,
    service: "SaaS Product Development",
    price: "Custom",
    description:
      "Complete SaaS development with multi-tenant architecture, admin dashboards, Chrome extensions, and mobile backends.",
    completedWorks: "8+ products launched",
    experience: "4+ years",
    totalHoursWorked: "Project / retainer",
    icon: webDesignIcon,
    link: "/contact",
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
      "Yes. I work across AWS, DigitalOcean, Contabo, Gthost, and Linux environments. I can provision production servers, automate deployments, configure Grafana and Prometheus, and manage WireGuard infrastructure. My current work spans 45+ servers across 20+ regions.",
  },
  {
    question: "Do you integrate third-party services and payment gateways?",
    answer:
      "Absolutely! I have extensive experience integrating Stripe, MAIB, OpenAI APIs, Socket.io for real-time features, and various other third-party services. I ensure secure, reliable, and optimized integrations that meet industry standards.",
  },
  {
    question: "Can you build Chrome extensions and browser tools?",
    answer:
      "Yes. I shipped the eEagle VPN Chrome Extension, extending the platform's backend connectivity to browser-level VPN access.",
  },
  {
    question: "Do you offer maintenance and support?",
    answer:
      "Yes. I offer ongoing maintenance and managed operations covering bug fixes, feature delivery, security updates, performance work, observability, and incident alerting for production systems.",
  },
  {
    question: "What is your development approach?",
    answer:
      "I follow agile methodology with regular updates and iterations. I use Git for version control, implement CI/CD pipelines for automated testing and deployment, write clean and documented code, and ensure scalability and security from the ground up.",
  },
];

export const followerData: FollowerData[] = [
  {
    platform: "LinkedIn",
    followers: "Connect",
    url: "https://www.linkedin.com/in/aasimshah/",
    icon: linkedInIcon,
  },
  {
    platform: "GitHub",
    followers: "View code",
    url: "https://github.com/aasim-shah",
    icon: "https://github.githubassets.com/favicons/favicon.svg",
  },
  {
    platform: "Instagram",
    followers: "@themistyframes_",
    url: "https://www.instagram.com/themistyframes_/",
    icon: instagramIcon,
  },
];
