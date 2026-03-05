import { NextResponse } from 'next/server';
import { mockProjects } from '@/data/mock';

export async function GET() {
    // Simulate network delay for realistic mock
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json(mockProjects);
}

export async function POST(req: Request) {
    const body = await req.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Project created successfully", project: { id: Date.now().toString(), ...body } }, { status: 201 });
}

export async function PUT(req: Request) {
    const body = await req.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Project updated successfully", project: body }, { status: 200 });
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: `Project ${id} deleted successfully` }, { status: 200 });
}
