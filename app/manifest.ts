import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "AMH Gujranwala",
    description:
      "Private hospital in Satellite Town, Gujranwala with 24/7 emergency care, specialist doctors, and diagnostic services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#062a61",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
