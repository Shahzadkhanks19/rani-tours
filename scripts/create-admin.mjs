import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import mongoose from "mongoose";

const scrypt = promisify(scryptCallback);

const name = process.env.ADMIN_BOOTSTRAP_NAME?.trim();
const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || "";
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("MONGODB_URI is required in .env.local.");
if (!name || !email || !password) {
  throw new Error("Set ADMIN_BOOTSTRAP_NAME, ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD in .env.local before running npm run admin:create.");
}
if (password.length < 10 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
  throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be at least 10 characters with uppercase, lowercase and a number.");
}

const salt = randomBytes(16).toString("hex");
const derivedKey = await scrypt(password, salt, 64);
const passwordHash = `${salt}:${Buffer.from(derivedKey).toString("hex")}`;

await mongoose.connect(uri, { bufferCommands: false, maxPoolSize: 5 });
const collection = mongoose.connection.collection("adminusers");
const existing = await collection.findOne({ email });

if (existing) {
  console.log(`Admin already exists: ${email}`);
  await mongoose.disconnect();
  process.exit(0);
}

await collection.insertOne({
  name,
  email,
  passwordHash,
  role: "super_admin",
  isActive: true,
  lastLoginAt: null,
  passwordChangedAt: new Date(),
  resetPasswordTokenHash: null,
  resetPasswordExpiresAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

console.log(`Super admin created: ${email}`);
await mongoose.disconnect();
