import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        name: "Your Name",
        phone: "+84 123 456 789",
        address: "Ho Chi Minh City, Vietnam",
        cvUrl: "https://example.com/cv.pdf",
        bio: "Fullstack web developer."
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.json({ message: "Profile updated successfully", profile: body }, { status: 200 });
}
