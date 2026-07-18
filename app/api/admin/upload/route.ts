import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { uploadDoctorImage } from "@/lib/doctors-store";

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Image file is required." },
      { status: 400 },
    );
  }

  try {
    const url = await uploadDoctorImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Image upload failed.",
      },
      { status: 400 },
    );
  }
}
