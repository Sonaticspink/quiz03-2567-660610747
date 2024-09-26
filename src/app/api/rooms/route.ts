import { Database, DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
// import { console } from "inspector";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  let total:number = 0
  for(let room in (<Database>DB).rooms){
    total += 1
    room += 1
  }
  return NextResponse.json({

    ok: true,
    rooms: (<Database>DB).rooms,
    totalRooms: total
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();

  if(!payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );

  readDB();
  const DaB = (<Database>DB).rooms;
  const body = await request.json();
  
      return NextResponse.json(
        {
          ok: false,
          message: `Room ${"Olele"} already exists`,
        },
        { status: 400 }
      );
    
  }

  

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  // return NextResponse.json({
  //   ok: true,
  //   roomId: roomId,
  //   message: `Room ${"Olala"} has been created`,
  // });
// 