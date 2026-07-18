export type Doctor = {
  id: number;
  /** SEO-friendly URL segment, e.g. "dr-javed-iqbal-dermatologist". */
  slug: string;
  name: string;
  designation: string;
  degrees: string[];
  department: string;
  experience: string;
  visitingDays: string[];
  timings: string;
  expertise: string[];
  biography: string;
  image: string;
};

export function doctorPath(doctor: Doctor) {
  return `/doctors/${doctor.slug}`;
}
