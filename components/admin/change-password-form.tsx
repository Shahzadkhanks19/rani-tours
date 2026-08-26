"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(data.message || "Unable to update password.");
        return;
      }
      setMessage(data.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        ["Current password", currentPassword, setCurrentPassword, "current-password"],
        ["New password", newPassword, setNewPassword, "new-password"],
        ["Confirm new password", confirmPassword, setConfirmPassword, "new-password"],
      ].map(([label, value, setter, autoComplete]) => (
        <label key={label as string} className="block">
          <span className="mb-2 block text-sm font-semibold">{label as string}</span>
          <input type="password" required value={value as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} autoComplete={autoComplete as string} className="w-full rounded-xl border border-[#143124]/15 bg-white px-4 py-3 outline-none focus:border-[#0b6b3a] focus:ring-4 focus:ring-[#0b6b3a]/10" />
        </label>
      ))}
      <p className="text-xs leading-5 text-[#7b8d7e]">Use at least 10 characters with uppercase, lowercase and a number.</p>
      {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {message && <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
      <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-[#073b25] px-5 py-3 font-bold text-white hover:bg-[#0b6b3a] disabled:opacity-60">
        {loading && <LoaderCircle className="size-4 animate-spin" />}{loading ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
