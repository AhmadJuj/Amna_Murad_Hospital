import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { createDoctor, getDoctors } from "@/lib/doctors-store";

async function requireAdmin() {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  return NextResponse.json({ doctors: await getDoctors() });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const doctor = await createDoctor(await request.json());
    return NextResponse.json({ doctor }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid doctor." },
      { status: 400 },
    );
  }
}
