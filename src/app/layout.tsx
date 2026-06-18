import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharukesh A — Developer & IT Student Portfolio",
  description:
    "Personal portfolio of Sharukesh A — B.Tech IT student passionate about AI/ML, IoT, and full-stack development. Explore projects, skills, and experience.",
  keywords: ["Sharukesh", "Portfolio", "Developer", "AI", "ML", "IoT", "Full-Stack"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
