import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const studentRoll = searchParams.get('roll-no');

	return NextResponse.json({ hello: searchParams.get('helo') });
}
