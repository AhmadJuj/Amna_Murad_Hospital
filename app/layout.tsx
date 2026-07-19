import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "./ui/whatsapp-button";
import { JsonLd } from "./ui/json-ld";
import { coreKeywords, siteName, siteUrl } from "@/lib/seo";
import { hospitalSchema, websiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Best Hospital in Gujranwala | Amna Murad Hospital",
    template: `%s | ${siteName}`,
  },
  description:
    "Amna Murad Hospital is a trusted private hospital in Gujranwala with 24/7 emergency care, specialist doctors, lab tests, ultrasound & X-ray in Satellite Town.",
  keywords: coreKeywords,
  applicationName: siteName,
  category: "Healthcare",
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName,
    title: "Best Hospital in Gujranwala | Amna Murad Hospital",
    description:
      "Private hospital in Gujranwala — 24/7 emergency, specialist doctors, diagnostics, and online appointment booking in Satellite Town.",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Amna Murad Hospital Gujranwala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Hospital in Gujranwala | Amna Murad Hospital",
    description:
      "Trusted private hospital in Gujranwala with 24/7 emergency care, specialists, and diagnostic services.",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#062a61",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[hospitalSchema(), websiteSchema()]} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
