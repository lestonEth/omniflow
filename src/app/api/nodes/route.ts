import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse JSON request body
        console.log('Received Data:', body);

        // Destructure request data
        const { url, headers = {}, body: requestBody, method } = body;

        // Ensure required fields exist
        if (!url || !method) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Set default headers if not provided
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers, // Merge with user-provided headers
        };

        console.log('API Request:', { url, headers: defaultHeaders, body: requestBody, method });

        // Make an API request using Axios
        const response = await axios({
            method,
            url,
            headers: defaultHeaders,
            data: method !== 'GET' ? requestBody : undefined, // Avoid sending body in GET requests
        });

        console.log('API Response:', response.data);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        console.error('API Error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data || 'Failed to process request' },
            { status: error.response?.status || 500 }
        );
    }
}

// ✅ Enhanced GET Handler using Axios
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');
        console.log('Received URL:', url);

        if (!url) {
            return NextResponse.json({ message: 'Nodes API is working' }, { status: 200 });
        }

        // Fetch data from the external API using Axios
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('API Response:', response.data);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        console.error('GET API Error:', error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data || 'Failed to fetch data' },
            { status: error.response?.status || 500 }
        );
    }
}
