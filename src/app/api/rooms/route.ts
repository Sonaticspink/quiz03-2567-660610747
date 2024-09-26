import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { console } from "inspector";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();
  let total:number = 0
  for(let rooms in (<any>DB).rooms){
    total += 1
  }
  return NextResponse.json({

    ok: true,
    rooms: (<any>DB).rooms,
    totalRooms: total
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();

  // if(!payload)
  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  readDB();
  const DaB = (<any>DB).rooms;
  const body = await request.json();
  for (const exist of DaB.roomName) {
    if (exist.roomName === body.roomName) {
      return NextResponse.json(
        {
          ok: false,
          message: `Room ${exist.roomName} already exists`,
        },
        { status: 400 }
      );
    }
  }

  

  const roomId = nanoid();

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId: roomId,
    message: `Room ${body.roomName} has been created`,
  });
};
