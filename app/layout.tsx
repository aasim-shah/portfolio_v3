import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
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
    default: "Aasim Shah | Full-Stack Developer in Pakistan",
    template: "%s | Syed Aasim Shah"
  },
  description:
    "Aasim Shah — also spelled Asim Shah, full name Syed Aasim Shah — is a senior full-stack developer in Islamabad, Pakistan specializing in Node.js, React, Next.js, SaaS, APIs, and cloud infrastructure.",
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
    title: "Aasim Shah | Full-Stack Developer in Pakistan",
    description:
      "Backend-focused engineer with 5+ years of experience across multi-tenant SaaS, VPN infrastructure serving approximately 2M users, fintech, healthtech, AI, and cloud automation.",
    // Social share image is provided by app/opengraph-image.tsx (1200×630, generated).
  },
  twitter: {
    card: "summary_large_image",
    title: "Aasim Shah | Full-Stack Developer in Pakistan",
    description:
      "Backend-focused engineer building production SaaS, VPN infrastructure, real-time systems, payments, AI platforms, and cloud automation.",
    // Card image is provided by app/twitter-image.tsx.
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
  icons: {
    icon: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "Aasim Shah",
    statusBarStyle: "default",
  },
  applicationName: "Aasim Shah Portfolio",
};

export const viewport: Viewport = {
  themeColor: "#070708",
};

const personId = "https://aasimshah.com/#person";
const orgId = "https://corebytestudio.com/#organization";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://aasimshah.com/#website",
      url: "https://aasimshah.com",
      name: "Syed Aasim Shah",
      alternateName: ["Aasim Shah", "Asim Shah"],
      description:
        "Portfolio of Syed Aasim Shah, a backend-focused Senior Full-Stack Engineer and Solution Architect.",
      inLanguage: "en",
      publisher: { "@id": personId },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://aasimshah.com/blogs?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Syed Aasim Shah",
      alternateName: ["Aasim Shah", "Asim Shah", "Syed Asim Shah"],
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
        "https://stackoverflow.com/users/26885843/aasim-shah",
        "https://www.instagram.com/themistyframes_/",
      ],
      jobTitle: "Senior Full-Stack Engineer & Solution Architect",
      // Current employer. The founder relationship with CoreByte Studio is
      // expressed via the Organization node's `founder` field + `affiliation` below.
      worksFor: {
        "@type": "Organization",
        name: "Appworks",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
      },
      affiliation: { "@id": orgId },
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
          recognizedBy: { "@type": "Organization", name: "Coursera" },
          dateCreated: "2023",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Advanced MERN Stack course",
          credentialCategory: "Certificate",
          recognizedBy: { "@type": "Organization", name: "Udemy" },
          dateCreated: "2021",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": orgId,
      name: "CoreByte Studio",
      url: "https://corebytestudio.com",
      description:
        "Software studio building reliable web, mobile, backend, cloud, and AI products.",
      founder: { "@id": personId },
      foundingDate: "2023",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://aasimshah.com/#service",
      name: "Syed Aasim Shah - Software Architecture & Engineering Services",
      description:
        "Backend architecture, production SaaS, VPN infrastructure, cloud automation, payments, and AI engineering services.",
      image: "https://aasimshah.com/profile.png",
      url: "https://aasimshah.com",
      provider: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      areaServed: "Worldwide",
      availableLanguage: ["English", "Urdu"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NS5JRS57S0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NS5JRS57S0');
          `}
        </Script>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full items-start bg-darkest-gray">
            <SideNavbar />
            <div className="w-full bg-darkest-gray lg:flex-1">
              <Navbar />
              <main className="bg-darkest-gray">{children}</main>
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
