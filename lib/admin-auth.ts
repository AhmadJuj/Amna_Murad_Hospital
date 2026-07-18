import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const sessionCookieName = "amh_admin_session";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required for admin authentication.`);
  }
  return value;
}

function sign(value: string) {
  return createHmac("sha256", requiredEnv("ADMIN_SESSION_SECRET"))
    .update(value)
    .digest("hex");
}

function safeEqual(first: string, second: string) {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = requiredEnv("ADMIN_EMAIL");
  const expectedPassword = requiredEnv("ADMIN_PASSWORD");

  return (
    safeEqual(email.trim().toLowerCase(), expectedEmail.toLowerCase()) &&
    safeEqual(password, expectedPassword)
  );
}

export function createAdminSessionValue(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, issuedAt: Date.now() }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionValue(value?: string) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return false;
  }

  return safeEqual(signature, sign(payload));
}

export async function isAdminSessionValid() {
  const cookieStore = await cookies();
  return verifyAdminSessionValue(cookieStore.get(sessionCookieName)?.value);
}

export function adminCookieOptions() {
  return {
    name: sessionCookieName,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export { sessionCookieName };
