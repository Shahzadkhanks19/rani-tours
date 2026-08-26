import { connectToDatabase } from "@/lib/db";
import { ActivityLog } from "@/models/ActivityLog";

export default async function AdminActivityPage() {
  await connectToDatabase();
  const items = await ActivityLog.find({}).sort({ createdAt: -1 }).limit(100).lean();

  return (
    <div className="space-y-7">
      <section><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6b3a]">Audit trail</p><h1 className="mt-1 text-3xl font-black">Activity Log</h1><p className="mt-2 text-[#6d806f]">Recent authentication and CMS actions performed by administrators.</p></section>
      <section className="overflow-hidden rounded-2xl border border-[#143124]/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f5f8f2] text-xs uppercase tracking-wider text-[#6d806f]"><tr><th className="px-5 py-4">Action</th><th className="px-5 py-4">Admin</th><th className="px-5 py-4">Area</th><th className="px-5 py-4">Date</th></tr></thead>
            <tbody className="divide-y divide-[#143124]/8">
              {items.map((item) => <tr key={item._id.toString()} className="hover:bg-[#fafcf8]"><td className="px-5 py-4 font-semibold">{String(item.action)}</td><td className="px-5 py-4">{String(item.adminName || "System")}</td><td className="px-5 py-4 capitalize text-[#6d806f]">{String(item.entity)}</td><td className="px-5 py-4 text-[#6d806f]">{new Date(item.createdAt as Date).toLocaleString("en-IN")}</td></tr>)}
              {!items.length && <tr><td colSpan={4} className="px-5 py-12 text-center text-[#7b8d7e]">No activity recorded yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
