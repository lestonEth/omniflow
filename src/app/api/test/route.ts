import { NextResponse } from 'next/server';

interface Student {
    id: number;
    name: string;
    age: number;
}

export async function GET() {
    const students: Student[] = [
        { id: 1, name: 'Alice Johnson', age: 20 },
        { id: 2, name: 'Bob Smith', age: 22 },
        { id: 3, name: 'Charlie Brown', age: 21 },
    ];

    return NextResponse.json(students, { status: 200 });
}
