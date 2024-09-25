import { initAuth0 } from '@auth0/nextjs-auth0';
// import { initAuth0 } from '@auth0/nextjs-auth0/edge';

import { kv } from '@vercel/kv';

class VercelKVStore {

    async get(id) {
        console.log("######### GET", id);
        const val = await kv.get(id);
        return val ? JSON.parse(val) : null;
    }

    async set(id, val) {
        console.log("######### SET", id);
        // await kv.set(id, val, { ex: 60 * 60 * 24 });
        await kv.set(id, val);
    }
    async delete(id) {
        console.log("######### DELETE", id);
        await kv.del(id);
    }
}


export default initAuth0({
    secret: process.env.AUTH0_SECRET, 
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    session: {
        rollingDuration: 60 * 60 * 24, // 1-day session expiration
        // rolling: false,
        store: new VercelKVStore(),
        cookie: {
            httpOnly: true,
            sameSite: 'lax', // Use 'lax' or 'strict' depending on your needs
            secure: false, // Enable secure cookies in production (HTTPS)
        },
    },
    authorizationParams: {
        scope: 'openid profile email',
    },
});