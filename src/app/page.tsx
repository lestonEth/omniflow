import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Link href="/dashboard">
                <button className="text-white px-4 py-2 rounded-xl border border-gray-600">
                    Go to Dashboard</button>
            </Link>
        </div>
    )
}
