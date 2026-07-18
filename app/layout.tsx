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
    default: "Amna Murad Hospital Gujranwala | 24/7 Private Hospital",
    template: `%s | ${siteName}`,
  },
  description:
    "Amna Murad Hospital is a leading private hospital in Satellite Town, Gujranwala with 24/7 emergency care, specialist doctors, lab tests, ultrasound & X-ray.",
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
    title: "Amna Murad Hospital Gujranwala | 24/7 Private Hospital",
    description:
      "Leading private hospital in Satellite Town, Gujranwala. 24/7 emergency, specialist consultations, diagnostics, and online appointment booking.",
    images: [
      {
        url: "/logo.jpeg",
        width: 512,
        height: 512,
        alt: "Amna Murad Hospital Gujranwala logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amna Murad Hospital Gujranwala | 24/7 Private Hospital",
    description:
      "Leading private hospital in Gujranwala with 24/7 emergency care, specialist doctors, and diagnostic services.",
    images: ["/logo.jpeg"],
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
