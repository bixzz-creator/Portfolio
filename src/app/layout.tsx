import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharukesh A — Developer & IT Student Portfolio",
  description:
    "Personal portfolio of Sharukesh A — B.Tech IT student passionate about AI/ML, IoT, and full-stack development. Explore projects, skills, and experience.",
  keywords: ["Sharukesh", "Portfolio", "Developer", "AI", "ML", "IoT", "Full-Stack"],
  openGraph: {
    title: "Sharukesh A — Developer & IT Student Portfolio",
    description:
      "Personal portfolio of Sharukesh A — B.Tech IT student passionate about AI/ML, IoT, and full-stack development.",
    url: "https://sharukesh-portfolio-orpin.vercel.app",
    siteName: "Sharukesh A Portfolio",
    images: [
      {
        url: "https://sharukesh-portfolio-orpin.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sharukesh A — Developer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharukesh A — Developer & IT Student Portfolio",
    description:
      "Personal portfolio of Sharukesh A — B.Tech IT student passionate about AI/ML, IoT, and full-stack development.",
    images: ["https://sharukesh-portfolio-orpin.vercel.app/og-image.png"],
  },
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
