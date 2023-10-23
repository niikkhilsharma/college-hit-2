import { NextResponse } from 'next/server';
import fs from 'fs';
import axios from 'axios';

export async function GET() {
	const students = JSON.parse(fs.readFileSync('public/data.json', 'utf8'));

	return NextResponse.json(students);
}
