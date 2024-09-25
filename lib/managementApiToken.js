import axios from 'axios';
import { kv } from "@vercel/kv";

const TOKEN_KEY = 'a0_management_api_token';
const EXPIRATION_KEY = 'a0_management_api_token_expiration';

const getManagementAPIToken = async () => {
  const cachedToken = await kv.get(TOKEN_KEY);
  const tokenExpiry = await kv.get(EXPIRATION_KEY);

  // Check if the token is valid and not expired
  if (cachedToken && tokenExpiry > Date.now()) {
    console.log("####### Returning cached management API token");
    return cachedToken;
  }

  console.log("####### Getting new management API token");

  // Request a new token from Auth0 if it is expired or not found
  const response = await axios.post(`https://${process.env.AUTH0_MANAGEMENT_DOMAIN}/oauth/token`, {
    client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: `https://${process.env.AUTH0_MANAGEMENT_AUDIENCE}/api/v2/`,
    grant_type: 'client_credentials',
  });

  const newToken = response.data.access_token;
  const expiresIn = response.data.expires_in;

  // Store the new token in Vercel KV (Edge Config)
  await kv.set(TOKEN_KEY, newToken);
  await kv.set(EXPIRATION_KEY, Date.now() + expiresIn * 1000); // Store expiration time in milliseconds

  return newToken;
};

export default getManagementAPIToken;