import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import mongoose from "mongoose";

const scrypt = promisify(scryptCallback);
const name = process.env.ADMIN_BOOTSTRAP_NAME?.trim();
const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD || "";
const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("MONGODB_URI is required in .env.local.");
if (!name || !email || !password) throw new Error("Set ADMIN_BOOTSTRAP_NAME, ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD before running npm run admin:create.");
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) throw new Error("ADMIN_BOOTSTRAP_EMAIL must be a valid email address.");
if (name.length < 2 || name.length > 80) throw new Error("ADMIN_BOOTSTRAP_NAME must be between 2 and 80 characters.");
if (password.length < 12 || password.length > 128 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password) || /(password|qwerty|admin|rani tours|123456)/i.test(password)) throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be 12-128 characters with uppercase, lowercase, number and symbol, and must not contain common weak patterns.");

const salt = randomBytes(16).toString("hex");
const derivedKey = await scrypt(password, salt, 64);
const passwordHash = `${salt}:${Buffer.from(derivedKey).toString("hex")}`;
await mongoose.connect(uri, { bufferCommands: false, maxPoolSize: 5, serverSelectionTimeoutMS: 10000 });
const collection = mongoose.connection.collection("adminusers");
const existing = await collection.findOne({ email });
if (existing) { console.log(`Admin already exists: ${email}`); await mongoose.disconnect(); process.exit(0); }
await collection.insertOne({ name, email, passwordHash, role: "super_admin", isActive: true, lastLoginAt: null, passwordChangedAt: new Date(), resetPasswordTokenHash: null, resetPasswordExpiresAt: null, createdAt: new Date(), updatedAt: new Date() });
console.log(`Super admin created: ${email}`);
console.log("Remove ADMIN_BOOTSTRAP_NAME, ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD from the environment now.");
await mongoose.disconnect();
