import { useState } from 'react';
import axios from 'axios';
interface ApiResponse {
    response: any;
    status: number;
}

export function useApi() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [code, setCode] = useState<number | null>(null);

    const callApi = async (
        url: string,
        method: string,
        headers: Record<string, string> = {},
        body?: object
    ) => {
        setLoading(true);
        setError(null);
        setData(null);
        console.log("Calling API with:", url, method, headers, body);
        try {
            const apiMethod = method.toUpperCase();

            // Merge default headers with provided headers
            const finalHeaders = {
                'Content-Type': 'application/json',
                ...headers,
            };

            // Only include body if the method is not GET
            const fetchOptions: RequestInit = {
                method: apiMethod,
                headers: finalHeaders,
                body: apiMethod !== 'GET' ? JSON.stringify(body) : undefined,
            };

            const res = await fetch( method === 'GET' ? `/api/nodes?url=${url}` : '/api/nodes', fetchOptions);
            const result = await res.json();
            setCode(res?.status);
            setData(result);
        } catch (err: any) {
            setError('Failed to fetch API');
        } finally {
            setLoading(false);
        }
    };

    return { callApi, data, loading, error, code };
}
