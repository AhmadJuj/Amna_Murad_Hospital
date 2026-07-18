import { NextResponse } from "next/server";
import {
  adminCookieOptions,
  createAdminSessionValue,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password || !verifyAdminCredentials(email, password)) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    ...adminCookieOptions(),
    value: createAdminSessionValue(email),
  });

  return response;
}
