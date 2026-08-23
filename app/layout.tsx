import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import SocialLists from "@/components/Socials/SocialLists";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/providers/theme-provider";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
// import { Analytics } from "@vercel/analytics/react";
const spaceGrotesk = Space_Grotesk({
  variable: "--font-Space_Grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aasimshah.com'),
  title: {
    default: "Syed Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
    template: "%s | Syed Aasim Shah"
  },
  description:
    "Syed Aasim Shah is a backend-focused Senior Full-Stack Engineer and Solution Architect in Islamabad, Pakistan, with 5+ years of experience across VPN infrastructure, multi-tenant SaaS, fintech, healthtech, AI systems, and cloud automation.",
  keywords: [
    "Syed Aasim Shah",
    "Aasim Shah",
    "Aasim Shah developer",
    "MERN Stack Developer",
    "MERN Stack Developer Islamabad",
    "Backend Developer Pakistan",
    "Full Stack Developer",
    "Node.js Developer",
    "Express.js Developer",
    "React.js Developer",
    "Next.js Developer",
    "MongoDB Expert",
    "MySQL Developer",
    "VPN Infrastructure Developer",
    "VPN Backend Developer",
    "eEagle VPN Developer",
    "Server Automation",
    "Linux Server Management",
    "Grafana Monitoring",
    "DevOps Engineer",
    "Cloud Infrastructure",
    "AWS Developer",
    "DigitalOcean Developer",
    "Hetzner Cloud",
    "CI/CD Pipeline",
    "API Development",
    "RESTful API",
    "GraphQL API",
    "Socket.io Developer",
    "Real-time Chat Systems",
    "SaaS Development",
    "Multi-tenant Architecture",
    "Chrome Extension Developer",
    "Payment Gateway Integration",
    "Stripe Integration",
    "MAIB Payment Gateway",
    "Multi-vendor Marketplace",
    "POS System Development",
    "Restaurant Automation",
    "Hotel Management System",
    "HOHEAL Developer",
    "PIKUP POS",
    "TypeScript Developer",
    "JavaScript Developer",
    "Docker Specialist",
    "Bash Scripting",
    "WireGuard VPN",
    "OpenAI Integration",
    "AI Chatbot Development",
    "Fyrebot",
    "Flutter Backend Developer",
    "Mobile App Backend",
    "Sequelize ORM",
    "Firebase Developer",
    "Supabase Developer",
    "GitHub Actions",
    "Tailwind CSS",
    "Freelance Developer Pakistan",
    "Remote Backend Developer",
    "Hire MERN Stack Developer",
    "Professional Web Developer",
  ],
  authors: [{ name: "Syed Aasim Shah" }],
  creator: "Syed Aasim Shah",
  publisher: "Syed Aasim Shah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aasimshah.com",
    siteName: "Syed Aasim Shah - Engineering Portfolio",
    title: "Syed Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
    description:
      "Backend-focused engineer with 5+ years of experience across multi-tenant SaaS, VPN infrastructure serving approximately 2M users, fintech, healthtech, AI, and cloud automation.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Syed Aasim Shah - MERN Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Aasim Shah - Senior Full-Stack Engineer & Solution Architect",
    description:
      "Backend-focused engineer building production SaaS, VPN infrastructure, real-time systems, payments, AI platforms, and cloud automation.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aasimshah.com",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://aasimshah.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Aasim Shah Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aasim Shah" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Syed Aasim Shah",
              alternateName: "Aasim Shah",
              url: "https://aasimshah.com",
              image: "https://aasimshah.com/profile.png",
              email: "contact@aasimshah.com",
              telephone: "+923483360070",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.linkedin.com/in/aasimshah/",
                "https://www.instagram.com/themistyframes_/",
              ],
              jobTitle: "Senior Full-Stack Engineer & Solution Architect",
              worksFor: {
                "@type": "Organization",
                name: "Appworks",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Islamabad",
                  addressCountry: "PK",
                },
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "AUP Peshawar",
                description: "Bachelor of Computer Science",
              },
              knowsAbout: [
                "MERN Stack Development",
                "VPN Infrastructure",
                "Backend API Development",
                "Node.js",
                "Express.js",
                "React.js",
                "Next.js",
                "MongoDB",
                "MySQL",
                "Server Automation",
                "Linux Administration",
                "Grafana Monitoring",
                "AWS Cloud Services",
                "Docker",
                "CI/CD Pipelines",
                "Socket.io",
                "Real-time Systems",
                "TypeScript",
                "JavaScript",
                "Payment Gateway Integration",
                "Stripe",
                "Chrome Extensions",
                "SaaS Development",
                "Multi-tenant Architecture",
                "WireGuard VPN",
                "Bash Scripting",
              ],
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  name: "Advanced Backend Development using Nodejs and Expressjs",
                  credentialCategory: "Certificate",
                  recognizedBy: {
                    "@type": "Organization",
                    name: "Coursera",
                  },
                  dateCreated: "2023",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  name: "Advanced MERN Stack course",
                  credentialCategory: "Certificate",
                  recognizedBy: {
                    "@type": "Organization",
                    name: "Udemy",
                  },
                  dateCreated: "2021",
                },
              ],
            }),
          }}
        />
        
        {/* Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Syed Aasim Shah - Software Architecture & Engineering Services",
              description: "Backend architecture, production SaaS, VPN infrastructure, cloud automation, payments, and AI engineering services.",
              image: "https://aasimshah.com/profile.png",
              "@id": "https://aasimshah.com",
              url: "https://aasimshah.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
              geo: {
                "@type": "GeoCoordinates",
                addressCountry: "PK",
              },
              areaServed: "Worldwide",
              availableLanguage: ["English", "Urdu"],
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.linkedin.com/in/aasimshah/",
                "https://www.instagram.com/themistyframes_/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex items-start w-full">
            <SideNavbar />
            <div className="w-full lg:flex-1">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
            <SocialLists />
          </div>
        
         
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
