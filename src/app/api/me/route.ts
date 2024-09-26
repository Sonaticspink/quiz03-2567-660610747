import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Chittapan Phahongsa",
    studentId: "660610747",
  });
};
