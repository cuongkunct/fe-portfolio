import { NextResponse } from 'next/server';
import { mockBlogs, mockCategories } from '@/data/mock';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (category && category !== 'All') {
        const filteredBlogs = mockBlogs.filter(blog => blog.category === category);
        return NextResponse.json({
            categories: mockCategories,
            blogs: filteredBlogs
        });
    }

    return NextResponse.json({
        categories: mockCategories,
        blogs: mockBlogs
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Blog created successfully", blog: { id: Date.now().toString(), ...body } }, { status: 201 });
}

export async function PUT(req: Request) {
    const body = await req.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Blog updated successfully", blog: body }, { status: 200 });
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: `Blog ${id} deleted successfully` }, { status: 200 });
}
