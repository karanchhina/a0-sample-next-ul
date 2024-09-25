import { NextResponse } from 'next/server';
import axios from 'axios';
import getManagementAPIToken from '@/lib/managementApiToken';

export async function POST(req) {
    try {
        const { user_id } = await req.json();

        // Get the Auth0 Management API token
        const token = await getManagementAPIToken()

        // Make the POST request to Auth0 to trigger the verification email
        const response = await axios.post(
            `https://${process.env.AUTH0_MANAGEMENT_DOMAIN}/api/v2/jobs/verification-email`,
            { user_id }, // The payload
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json({ message: 'Verification email sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending verification email:', error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }
}