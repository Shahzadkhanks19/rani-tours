"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message || "Unable to sign in.");
        return;
      }
      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#6d806f]" />
          <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-[#143124]/15 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" placeholder="admin@ranitours.com" />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="admin-password" className="text-sm font-semibold">Password</label>
          <Link href="/admin/forgot-password" className="text-sm font-semibold text-[#0b6b3a] hover:underline">Forgot password?</Link>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-[#6d806f]" />
          <input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-[#143124]/15 bg-white py-3.5 pl-11 pr-12 outline-none transition focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" placeholder="Enter your password" />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#6d806f] hover:bg-[#143124]/5" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </div>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073b25] px-4 py-3.5 font-bold text-white transition hover:bg-[#0b6b3a] disabled:cursor-not-allowed disabled:opacity-65">
        {loading && <LoaderCircle className="size-5 animate-spin" />}
        {loading ? "Signing in…" : "Sign in to CMS"}
      </button>
    </form>
  );
}
