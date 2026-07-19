import type { Metadata } from "next";

/**
 * Central SEO configuration for Amna Murad Hospital.
 * Set NEXT_PUBLIC_SITE_URL in production (custom domain or Vercel URL)
 * so Open Graph / WhatsApp previews resolve the hospital logo correctly.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "https://www.amnamuradhospital.com";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Amna Murad Hospital";
export const siteShortName = "AMH Gujranwala";

export const hospitalAddress = {
  street: "3-D Satellite Town, Dastgir Road",
  locality: "Gujranwala",
  region: "Punjab",
  postalCode: "52250",
  country: "PK",
} as const;

export const hospitalGeo = {
  latitude: 32.1685535,
  longitude: 74.2000078,
} as const;

export const hospitalPhoneE164 = "+923006409917";
export const emergencyPhoneE164 = "+92553734141";
export const hospitalEmail = "info@amnamuradhospital.com";
export const googleMapsUrl =
  "https://www.google.com/maps/place/Amna+Murad+Hospital/@32.1685535,74.2000078,17z/data=!3m1!4b1!4m6!3m5!1s0x391f29b84928b69f:0x4730ffceada2420b!8m2!3d32.1685535!4d74.2000078!16s%2Fg%2F11rtl_dgpz";

/** Site-wide keywords targeting high-intent hospital searches in Pakistan. */
export const coreKeywords = [
  "hospital Gujranwala",
  "hospitals in Gujranwala",
  "best hospital in Gujranwala",
  "best hospitals Gujranwala",
  "private hospital Gujranwala",
  "private hospital in Gujranwala",
  "top hospital in Gujranwala",
  "Gujranwala hospital",
  "hospital near me Gujranwala",
  "hospital near me",
  "best private hospital in Pakistan",
  "24 hour hospital Gujranwala",
  "24/7 hospital Gujranwala",
  "emergency hospital Gujranwala",
  "emergency hospital near me Gujranwala",
  "hospital in Satellite Town Gujranwala",
  "Satellite Town hospital Gujranwala",
  "Dastgir Road hospital Gujranwala",
  "book doctor appointment online Gujranwala",
  "doctor appointment Gujranwala",
  "Amna Murad Hospital",
  "Amna Murad Hospital Gujranwala",
];

const defaultOgImage = {
  url: "/logo.jpeg",
  width: 1200,
  height: 630,
  alt: "Amna Murad Hospital Gujranwala logo",
};

type PageSeoInput = {
  /** Short title; the root layout template appends " | Amna Murad Hospital". */
  title: string;
  /** Use the full title as-is without the site-name template suffix. */
  absoluteTitle?: boolean;
  description: string;
  /** Path starting with "/", used for the canonical URL and Open Graph URL. */
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "profile";
};

/** Builds consistent per-page metadata: canonical URL, Open Graph, Twitter Card. */
export function buildMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  keywords = [],
  ogImage,
  ogType = "website",
}: PageSeoInput): Metadata {
  const image = ogImage
    ? { ...defaultOgImage, url: ogImage }
    : defaultOgImage;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...coreKeywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_PK",
      type: ogType,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
