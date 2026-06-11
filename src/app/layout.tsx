import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SocialDock from "@/components/SocialDock";

export const metadata: Metadata = {
  title: "BUNDOXXBRIAN — Full-Stack Developer | Mombasa, Kenya",
  description:
    "Freelance Full-Stack Developer & VA based in Mombasa, Kenya. Fast, clean web & mobile apps that help businesses grow online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ paddingBottom: "80px" }}>
        <Navbar />
        {children}
        <BottomNav />
        <SocialDock />
      </body>
    </html>
  );
}