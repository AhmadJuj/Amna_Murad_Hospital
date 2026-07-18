import { AdminClient } from "./admin-client";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getDoctors } from "@/lib/doctors-store";

export const metadata = {
  title: "Admin Login | Amna Murad Hospital",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isLoggedIn = await isAdminSessionValid();
  const doctors = isLoggedIn ? await getDoctors() : [];

  return <AdminClient initialDoctors={doctors} isLoggedIn={isLoggedIn} />;
}
