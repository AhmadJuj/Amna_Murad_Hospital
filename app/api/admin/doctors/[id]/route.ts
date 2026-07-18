import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { deleteDoctor, updateDoctor } from "@/lib/doctors-store";

async function requireAdmin() {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function PUT(
  request: Request,
  { params }: RouteContext<"/api/admin/doctors/[id]">,
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;

  try {
    const doctor = await updateDoctor(Number(id), await request.json());
    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found." }, { status: 404 });
    }

    return NextResponse.json({ doctor });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid doctor." },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext<"/api/admin/doctors/[id]">,
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await params;
  const deleted = await deleteDoctor(Number(id));

  if (!deleted) {
    return NextResponse.json({ message: "Doctor not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
