import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ theme: "theme1" }); // استرجاع الثيم الحالي
}

export async function POST(request: Request) {
    const { theme } = await request.json();
    if (!theme) {
        return NextResponse.json({ error: "Theme is required" }, { status: 400 });
    }

    // هنا المفروض يتم حفظ الثيم في الـ Database
    return NextResponse.json({ message: "Theme updated successfully" });
}
