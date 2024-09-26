import jwt from "jsonwebtoken";

import { Database, DB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  readDB();
  const Data = (<Database>DB)
  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Username or Password is incorrect",
  //   },
  //   { status: 400 }
  // );

  const token = "Replace this with token creation";
  for(const member in Data.users){
    if()
  }
  return NextResponse.json({ ok: true, token });
};
