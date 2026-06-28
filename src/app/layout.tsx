import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SocialDock from "@/components/SocialDock";
import ChatWidget from "@/components/ChatWidget";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BUNDOXXBRIAN — Full-Stack Developer | Mombasa, Kenya",
    template: "%s | BUNDOXXBRIAN",
  },
  description:
    "Brian Kurui is a Freelance Full-Stack Developer, Brand Designer & VA based in Mombasa, Kenya. I build fast web & mobile apps that help businesses grow online.",
  keywords: [
    "web developer Mombasa Kenya",
    "full-stack developer Kenya",
    "React developer Mombasa",
    "Next.js developer Kenya",
    "mobile app developer Kenya",
    "brand designer Mombasa",
    "virtual assistant Kenya",
    "BundoxxBrian",
    "freelance developer Kenya",
  ],
  authors: [{ name: "Brian Kurui", url: "https://bundoxx-brian.vercel.app" }],
  creator: "Brian Kurui — BundoxxBrian",
  metadataBase: new URL("https://bundoxx-brian.vercel.app"),
  alternates: {
    canonical: "https://bundoxx-brian.vercel.app",
  },
  openGraph: {
    title: "BUNDOXXBRIAN — Full-Stack Developer | Mombasa, Kenya",
    description:
      "I build fast, clean web & mobile apps that help businesses grow online. Based in Mombasa, Kenya.",
    url: "https://bundoxx-brian.vercel.app",
    siteName: "BUNDOXXBRIAN",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BUNDOXXBRIAN — Full-Stack Developer | Mombasa, Kenya",
    description:
      "I build fast, clean web & mobile apps. Based in Mombasa, Kenya. 🐝",
    creator: "@BundoxxB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

// ── JSON-LD Structured Data ──
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://bundoxx-brian.vercel.app/#brian",
      name: "Brian Kurui",
      alternateName: ["BundoxxBrian", "Mr. BundoxxB", "BundoxxThe Bee"],
      url: "https://bundoxx-brian.vercel.app",
      image: "https://bundoxx-brian.vercel.app/photo1.jpg",
      jobTitle: "Full-Stack Developer",
      description:
        "Freelance Full-Stack Developer, Brand Designer and Virtual Assistant based in Mombasa, Kenya. Focused. Fast. Reliable. 🐝",
      email: "Bundoxb@gmail.com",
      telephone: "+254768771559",
      sameAs: [
        "https://github.com/bundoxb-art",
        "https://instagram.com/BundoxxB",
        "https://tiktok.com/@BundoxxB",
        "https://www.linkedin.com/in/bundoxx-the-brian-778576348",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mombasa",
        addressRegion: "Mombasa County",
        addressCountry: "KE",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "React Native",
        "Python",
        "M-Pesa Integration",
        "Supabase",
        "Web Development",
        "Mobile App Development",
        "Brand Design",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://bundoxx-brian.vercel.app/#business",
      name: "BundoxxThe Bee",
      alternateName: "BundoxxBrian",
      url: "https://bundoxx-brian.vercel.app",
      logo: "https://bundoxx-brian.vercel.app/bee.jpg",
      image: "https://bundoxx-brian.vercel.app/photo1.jpg",
      description:
        "Freelance web development, mobile app development, brand design and virtual assistant services in Mombasa, Kenya.",
      email: "Bundoxb@gmail.com",
      telephone: "+254768771559",
      priceRange: "KES 5,000 — KES 130,000+",
      currenciesAccepted: "KES, USD",
      paymentAccepted: "M-Pesa, Bank Transfer, Stripe",
      areaServed: [
        {
          "@type": "City",
          name: "Mombasa",
        },
        {
          "@type": "Country",
          name: "Kenya",
        },
        {
          "@type": "Place",
          name: "Worldwide (Remote)",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Makupa",
        addressLocality: "Mombasa",
        addressRegion: "Mombasa County",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -4.035,
        longitude: 39.639,
      },
      founder: {
        "@id": "https://bundoxx-brian.vercel.app/#brian",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "BundoxxBrian Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Development",
              description:
                "Custom websites and web applications using React and Next.js",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "15000",
              maxPrice: "80000",
              priceCurrency: "KES",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App Development",
              description:
                "Cross-platform Android and iOS apps using React Native",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "60000",
              maxPrice: "130000",
              priceCurrency: "KES",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brand & Logo Design",
              description:
                "Professional logo design and full brand identity packages",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "5000",
              maxPrice: "15000",
              priceCurrency: "KES",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Virtual Assistant & Data Entry",
              description:
                "Professional VA services including data entry, research and content management",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "600",
              priceCurrency: "KES",
              unitText: "per hour",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://bundoxx-brian.vercel.app/#website",
      url: "https://bundoxx-brian.vercel.app",
      name: "BUNDOXXBRIAN Portfolio",
      description:
        "Portfolio of Brian Kurui — Full-Stack Developer, Brand Designer & VA based in Mombasa, Kenya",
      publisher: {
        "@id": "https://bundoxx-brian.vercel.app/#brian",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://bundoxx-brian.vercel.app/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ paddingBottom: "80px", background: "#05070d" }}
      >
        <Navbar />
        {children}
        <ChatWidget />
        <BottomNav />
        <SocialDock />
      </body>
    </html>
  );
}