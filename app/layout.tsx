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
    default: "Aasim Shah - Full Stack Developer | MERN Stack Expert | Web Development Services",
    template: "%s | Aasim Shah - Full Stack Developer"
  },
  description:
    "Aasim Shah is an experienced Full Stack Developer specializing in MERN Stack development, API development, and cloud solutions. Offering professional web development services including Next.js, Node.js, React, MongoDB, and AWS deployment. 5+ years of experience with 40+ completed projects.",
  keywords: [
    "Aasim Shah",
    "Aasim Shah developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Web Development Services",
    "Next.js Developer",
    "Node.js Developer",
    "React Developer",
    "MongoDB Expert",
    "API Development",
    "GraphQL Developer",
    "RESTful API",
    "Cloud Services",
    "AWS Deployment",
    "Docker Specialist",
    "TypeScript Developer",
    "Backend Developer",
    "Frontend Developer",
    "Website Development",
    "Custom Web Applications",
    "E-commerce Development",
    "SaaS Development",
    "DevOps Engineer",
    "CI/CD Pipeline",
    "PostgreSQL",
    "Express.js",
    "Fastify",
    "Flutter Developer",
    "Cross-platform Development",
    "Freelance Developer",
    "Software Engineer",
    "Web Designer",
    "UI/UX Development",
    "Responsive Web Design",
    "Mobile-First Development",
    "SEO Optimization",
    "Performance Optimization",
    "Hotel Management System",
    "Multi-vendor Platform",
    "Admin Dashboard Development",
    "Payment Gateway Integration",
  ],
  authors: [{ name: "Aasim Shah" }],
  creator: "Aasim Shah",
  publisher: "Aasim Shah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aasimshah.com",
    siteName: "Aasim Shah - Full Stack Developer",
    title: "Aasim Shah - Full Stack Developer | MERN Stack Expert | Web Development Services",
    description:
      "Experienced Full Stack Developer specializing in MERN Stack, API development, and cloud solutions. 5+ years experience, 40+ completed projects. Professional web development services.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Aasim Shah - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aasim Shah - Full Stack Developer | MERN Stack Expert",
    description:
      "Experienced Full Stack Developer specializing in MERN Stack, API development, and cloud solutions. 5+ years experience, 40+ completed projects.",
    images: ["/profile.png"],
    creator: "@aasimshah",
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
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
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aasim Shah",
              url: "https://aasimshah.com",
              image: "https://aasimshah.com/profile.png",
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.linkedin.com/in/aasimshah",
                "https://www.upwork.com/freelancers/aasimshah",
                "https://www.fiverr.com/users/aaasimmshah",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Dcodax PVT LTD",
              },
              knowsAbout: [
                "MERN Stack Development",
                "Full Stack Development",
                "API Development",
                "Cloud Computing",
                "DevOps",
                "Next.js",
                "Node.js",
                "React",
                "MongoDB",
                "PostgreSQL",
                "AWS",
                "Docker",
                "TypeScript",
                "GraphQL",
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
              name: "Aasim Shah - Web Development Services",
              image: "https://aasimshah.com/profile.png",
              "@id": "https://aasimshah.com",
              url: "https://aasimshah.com",
              priceRange: "$30 - $80+",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "45",
              },
              sameAs: [
                "https://github.com/aasim-shah",
                "https://www.upwork.com/freelancers/aasimshah",
                "https://www.fiverr.com/users/aaasimmshah",
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
