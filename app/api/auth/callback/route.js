// import { handleLogin } from '@auth0/nextjs-auth0';
import auth0 from "@/lib/auth0";

// This tells Next.js to treat the route as dynamic and not try to statically optimize it.
// export const dynamic = 'force-dynamic';

export const GET = async (req) => await auth0.handleCallback(req)