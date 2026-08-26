"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message || "If the account exists, a reset link has been sent.");
    } catch {
      setMessage("Unable to process the request right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block"><span className="mb-2 block text-sm font-semibold">Admin email</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="w-full rounded-xl border border-[#143124]/15 px-4 py-3.5 outline-none focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" /></label>
      {message && <p className="rounded-xl bg-[#f0f6e9] px-4 py-3 text-sm text-[#315f39]">{message}</p>}
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073b25] px-4 py-3.5 font-bold text-white hover:bg-[#0b6b3a] disabled:opacity-60">{loading && <LoaderCircle className="size-4 animate-spin" />}{loading ? "Sending…" : "Send reset link"}</button>
      <Link href="/admin/login" className="block text-center text-sm font-semibold text-[#0b6b3a] hover:underline">Back to sign in</Link>
    </form>
  );
}

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message || "Unable to reset password.");
        return;
      }
      router.replace("/admin/login?reset=success");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block"><span className="mb-2 block text-sm font-semibold">New password</span><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-xl border border-[#143124]/15 px-4 py-3.5 outline-none focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" /></label>
      <label className="block"><span className="mb-2 block text-sm font-semibold">Confirm password</span><input type="password" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" className="w-full rounded-xl border border-[#143124]/15 px-4 py-3.5 outline-none focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" /></label>
      <p className="text-xs leading-5 text-[#7b8d7e]">At least 10 characters with uppercase, lowercase and a number.</p>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading || !token} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073b25] px-4 py-3.5 font-bold text-white hover:bg-[#0b6b3a] disabled:opacity-60">{loading && <LoaderCircle className="size-4 animate-spin" />}{loading ? "Resetting…" : "Reset password"}</button>
      {!token && <p className="text-center text-sm text-red-700">This reset URL is missing its token.</p>}
    </form>
  );
}
