import { Database, DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();
  const data = (<Database>DB)
  const roomm = request.nextUrl.searchParams.get("roomId");
  
  const foundroomd = data.messages.filter((r) => r.roomId === roomm);
  if(!foundroomd){
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );
  }
  return NextResponse.json(
    {ok: true,
    message: foundroomd
  }
  )
};

export const POST = async (request: NextRequest) => {
  readDB();
  
  const data = (<Database>DB)
  const roomm = request.nextUrl.searchParams.get("roomId");
  
  const foundroomd = data.messages.filter((r) => r.roomId === roomm);
  if(!foundroomd){
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );
  }

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  const body = await request.json();
  if(!payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  readDB();
  const data = (<Database>DB)
  let filtered = data.messages
  filtered = filtered.filter((mes) => mes === body.messageId)
  if(!filtered){
  return NextResponse.json(
    {
      ok: false,
      message: "Message is not found",
    },
    { status: 404 }
  );
}
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
