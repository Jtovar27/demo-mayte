import { SignJWT, jwtVerify } from "jose";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { supabase } from "@/lib/supabase";

async function getPasswordHash(): Promise<string> {
  try {
    const { data } = await supabase
      .from("auth")
      .select("password_hash")
      .eq("id", 1)
      .single();
    return data?.password_hash ?? "";
  } catch {
    return "";
  }
}

export async function savePasswordHash(hash: string): Promise<void> {
  const { error } = await supabase
    .from("auth")
    .upsert({ id: 1, password_hash: hash });
  if (error) throw error;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPasswordHash(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    const hashBuffer = Buffer.from(hash, "hex");
    const derived = scryptSync(password, salt, 64);
    return timingSafeEqual(hashBuffer, derived);
  } catch {
    return false;
  }
}

export async function checkPassword(password: string): Promise<boolean> {
  const stored = await getPasswordHash();
  if (!stored) return false; // no password configured — deny all access
  return verifyPasswordHash(password, stored);
}

if (!process.env.ADMIN_JWT_SECRET) {
  throw new Error("ADMIN_JWT_SECRET environment variable is required");
}
export const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}
