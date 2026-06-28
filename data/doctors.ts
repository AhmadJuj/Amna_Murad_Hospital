export type Doctor = {
  id: number;
  name: string;
  designation: string;
  degrees: string[];
  department: string;
  experience: string;
  visitingDays: string[];
  timings: string;
  expertise: string[];
  biography: string;
};

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Shazal Nazir",
    designation: "Physiotherapist | Chiropractor",
    degrees: ["DPT", "MPhil-PT (Gold Medalist)"],
    department: "Physiotherapy",
    experience: "9 years",
    visitingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timings: "6:00 PM - 9:00 PM",
    expertise: [
      "Orthopedic Rehabilitation",
      "Spinal Disorders",
      "Neck Pain",
      "Back Pain",
      "Sciatica",
      "Frozen Shoulder",
      "Knee Osteoarthritis",
      "Sports Injuries",
      "Post Surgical Rehabilitation",
    ],
    biography:
      "Experienced physiotherapist and chiropractor specializing in orthopedic rehabilitation, spinal disorders, musculoskeletal pain management, sports injuries, and post-surgical rehabilitation.",
  },
  {
    id: 2,
    name: "Dr. Sana Fatima",
    designation:
      "Consultant Gynecologist, Obstetrician & Infertility Specialist",
    degrees: ["MBBS", "FCPS"],
    department: "Gynecology & Obstetrics",
    experience: "7 years (including residency)",
    visitingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    timings: "10:00 AM - 3:00 PM",
    expertise: [
      "Pregnancy Care",
      "Gynecological Disorders",
      "Infertility Evaluation",
      "Infertility Treatment",
      "Family Planning",
      "Women's Reproductive Health",
    ],
    biography:
      "Dr. Sana is a dedicated Gynecologist, Obstetrician, and Infertility Specialist committed to providing compassionate, evidence-based care for women. She specializes in pregnancy care, gynecological disorders, infertility evaluation and treatment, family planning, and women's reproductive health. Her goal is to help women achieve optimal health and fulfill their dream of parenthood through personalized, patient-centered care.",
  },
  {
    id: 3,
    name: "Dr. Hafsa Ejaz",
    designation: "Consultant General & Breast Surgeon",
    degrees: ["MBBS", "FCPS"],
    department: "General Surgery",
    experience: "10 years",
    visitingDays: ["Monday", "Wednesday", "Friday"],
    timings: "7:00 PM - 9:00 PM",
    expertise: ["General Surgery", "Breast Surgery", "Emergency Surgery"],
    biography:
      "Consultant General and Breast Surgeon with 10 years of experience in general and emergency surgical procedures.",
  },
  {
    id: 4,
    name: "Dr. Laiba Khalid",
    designation: "Physiotherapist",
    degrees: ["DPT (UOS)", "MPPTA", "HCPC (UK)"],
    department: "Physiotherapy",
    experience: "4 years",
    visitingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    timings: "9:00 AM - 3:00 PM",
    expertise: [
      "Musculoskeletal (MSK) Disorders",
      "Sports Injuries",
      "Sports Rehabilitation",
      "Physical Therapy",
      "Rehabilitation",
      "Pain Management",
    ],
    biography:
      "Dr. Laiba Khalid is a qualified physiotherapist with four years of clinical experience. She specializes in the assessment and treatment of musculoskeletal conditions and sports-related injuries. She has previously served at Ashraf Hospital, published research in an international sports journal, and has three years of teaching experience at Royal Medical College and Riphah International University. She currently serves as the Head of Department (HOD) at Royal Medical College while providing patient-centered physiotherapy care.",
  },
  {
    id: 5,
    name: "Dr. Aimen Anjum",
    designation: "Lady Dental Surgeon",
    degrees: ["BDS"],
    department: "Dental",
    experience: "6 years",
    visitingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    timings: "5:30 PM - 8:30 PM",
    expertise: [
      "General Dentistry",
      "Preventive Dental Care",
      "Pediatric Dentistry",
      "Adult Dental Care",
      "Women's Dental Health",
      "Oral Health Consultation",
    ],
    biography:
      "Dr. Aimen Anjum is a Lady Dental Surgeon with six years of clinical experience in both public and private healthcare sectors. She previously served as a Dental Surgeon at Children's Hospital Lahore and Allied Hospital Faisalabad. She has extensive experience treating both children and adults and is committed to providing high-quality, patient-centered dental care. Special attention is given to ensuring privacy and comfort for female patients, particularly those observing hijab. She currently runs her own clinical practice, Aimen's Dental Care, at Amna Murad Hospital, Satellite Town, Gujranwala.",
  },
];

export const doctorPortraits: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=520&q=62",
  2: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=520&q=62",
  3: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=520&q=62",
  4: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=520&q=62",
  5: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=520&q=62",
};
