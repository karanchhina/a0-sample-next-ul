import auth0 from "@/lib/auth0";
import { NextResponse } from 'next/server';

export const GET = async (req) => {

  console.log(`Incoming cookie: ${req.headers.get('cookie')}`);

  const session = await auth0.getSession(req);

  return new NextResponse(JSON.stringify({ session }), { status: 200 });

}


// export async function GET(req) {

//     console.log(`Incoming cookie: ${req.headers.get('cookie')}`);

//     const session = await auth0.getSession(req);

//     return new NextResponse(JSON.stringify({ session: session }), { status: 200 });

// }
