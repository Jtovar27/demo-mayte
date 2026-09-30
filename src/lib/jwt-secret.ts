if (!process.env.ADMIN_JWT_SECRET) {
  throw new Error("ADMIN_JWT_SECRET environment variable is required");
}
export const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET);
