import type { Doctor } from "@/data/doctors";
import {
  emergencyPhoneE164,
  googleMapsUrl,
  hospitalAddress,
  hospitalEmail,
  hospitalGeo,
  hospitalPhoneE164,
  siteName,
  siteUrl,
} from "./seo";

/**
 * Schema.org JSON-LD builders for rich results and AI search engines.
 * Rendered via <script type="application/ld+json"> in server components.
 */

const hospitalId = `${siteUrl}/#hospital`;

export function hospitalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "LocalBusiness"],
    "@id": hospitalId,
    name: siteName,
    alternateName: "AMH Gujranwala",
    description:
      "Amna Murad Hospital is a private hospital in Satellite Town, Gujranwala, Pakistan offering 24/7 emergency care, specialist consultations, gynecology, dermatology, general surgery, dental care, physiotherapy, and a full diagnostic laboratory.",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    image: `${siteUrl}/logo.jpeg`,
    telephone: hospitalPhoneE164,
    email: hospitalEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: hospitalAddress.street,
      addressLocality: hospitalAddress.locality,
      addressRegion: hospitalAddress.region,
      postalCode: hospitalAddress.postalCode,
      addressCountry: hospitalAddress.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hospitalGeo.latitude,
      longitude: hospitalGeo.longitude,
    },
    hasMap: googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "Emergency department open 24 hours",
      },
    ],
    medicalSpecialty: [
      "Dermatology",
      "Gynecologic",
      "Obstetric",
      "Surgical",
      "Physiotherapy",
      "Dentistry",
      "Pediatric",
      "Neurologic",
      "DietNutrition",
      "Psychiatric",
      "PrimaryCare",
      "Emergency",
    ],
    availableService: [
      { "@type": "MedicalProcedure", name: "24/7 Emergency Care" },
      { "@type": "MedicalTest", name: "Laboratory Tests" },
      { "@type": "MedicalTest", name: "Ultrasound" },
      { "@type": "MedicalTest", name: "Digital X-Ray" },
      { "@type": "MedicalTest", name: "ECG" },
      { "@type": "MedicalProcedure", name: "General Surgery" },
      { "@type": "MedicalProcedure", name: "Maternity & Pregnancy Care" },
      { "@type": "MedicalProcedure", name: "Dental Treatment" },
      { "@type": "MedicalProcedure", name: "Physiotherapy & Rehabilitation" },
      { "@type": "MedicalProcedure", name: "Pediatric Consultation" },
      { "@type": "MedicalProcedure", name: "Neuro Physician Consultation" },
      { "@type": "MedicalProcedure", name: "Clinical Psychology Consultation" },
      { "@type": "MedicalProcedure", name: "Nutrition & Dietitian Consultation" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: hospitalPhoneE164,
        contactType: "appointments",
        availableLanguage: ["en", "ur"],
      },
      {
        "@type": "ContactPoint",
        telephone: emergencyPhoneE164,
        contactType: "emergency",
        availableLanguage: ["en", "ur"],
      },
    ],
    currenciesAccepted: "PKR",
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Gujranwala" },
      { "@type": "State", name: "Punjab, Pakistan" },
    ],
  };
}

export function physicianSchema(doctor: Doctor, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${siteUrl}/doctors/${slug}#physician`,
    name: doctor.name,
    url: `${siteUrl}/doctors/${slug}`,
    description: doctor.biography,
    jobTitle: doctor.designation,
    medicalSpecialty: doctor.department,
    knowsAbout: doctor.expertise,
    hasCredential: doctor.degrees.map((degree) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: degree,
    })),
    worksFor: { "@id": hospitalId },
    memberOf: { "@id": hospitalId },
    workLocation: {
      "@type": "Hospital",
      "@id": hospitalId,
      name: siteName,
    },
    availableService: {
      "@type": "MedicalProcedure",
      name: `${doctor.department} consultation`,
    },
    telephone: hospitalPhoneE164,
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": hospitalId },
    inLanguage: "en-PK",
  };
}
