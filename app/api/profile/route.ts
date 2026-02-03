import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {

        return NextResponse.json({
            success: true,
            message: 'Profile API endpoint - GET method',
            data: null,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {


        const body = await request.json();

        return NextResponse.json({
            success: true,
            message: 'Profile API endpoint - POST method',
            data: body,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
