import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SocialDock from "@/components/SocialDock";

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
  title: "BUNDOXXBRIAN — Full-Stack Developer | Mombasa, Kenya",
  description:
    "Freelance Full-Stack Developer & VA based in Mombasa, Kenya. Fast, clean web & mobile apps that help businesses grow online.",
  keywords:
    "freelance web developer Kenya, full-stack developer Mombasa, React developer Kenya, BundoxxBrian",
  openGraph: {
    title: "BUNDOXXBRIAN — Full-Stack Developer",
    description:
      "I build fast, clean web & mobile apps. Based in Mombasa, Kenya.",
    type: "website",
    url: "https://bundoxx-brian.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ paddingBottom: "80px", background: "#05070d" }}
      >
        <Navbar />
        {children}
        <BottomNav />
        <SocialDock />
      </body>
    </html>
  );
}