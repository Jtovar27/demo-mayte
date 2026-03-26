import { SignJWT, jwtVerify } from "jose";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const AUTH_FILE = path.join(process.cwd(), "content", "auth.json");

async function getPasswordHash(): Promise<string> {
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    const data = JSON.parse(raw) as { passwordHash?: string };
    return data.passwordHash ?? "";
  } catch {
    return "";
  }
}

export async function savePasswordHash(hash: string): Promise<void> {
  await fs.writeFile(AUTH_FILE, JSON.stringify({ passwordHash: hash }, null, 2), "utf-8");
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
  if (stored) return verifyPasswordHash(password, stored);
  // Fall back to env var (plaintext) when no hash is set
  return password === process.env.ADMIN_PASSWORD;
}

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "fallback-secret-change-me"
);

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
