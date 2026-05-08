import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.TIMELINE_ADMIN_PASSWORD;

    if (!adminPassword) {
      // If not set, default to a secure check (or fail if you prefer)
      // For now, let's allow 'admin123' if NOT set in env, 
      // but the user should set it in Vercel.
      if (password === 'admin123') {
        return NextResponse.json({ success: true });
      }
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Incorrect password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}
