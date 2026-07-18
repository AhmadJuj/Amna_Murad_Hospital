import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import {
  doctorImagesDirectory,
  ensureDoctorImagesDirectory,
  slugify,
} from "@/lib/doctors-store";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const extensionByType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Image file is required." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      { message: "Only JPG, PNG, and WEBP images are allowed." },
      { status: 400 },
    );
  }

  await ensureDoctorImagesDirectory();

  const safeBaseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "doctor";
  const extension = extensionByType[file.type];
  const fileName = `${Date.now()}-${safeBaseName}.${extension}`;
  const filePath = path.join(doctorImagesDirectory, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/doctor-images/${fileName}` });
}
