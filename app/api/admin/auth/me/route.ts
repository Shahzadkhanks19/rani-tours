import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ admin });
}
