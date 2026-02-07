import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/db';
import Watchlist from '@/models/Watchlist';

export async function GET(req: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const watchlist = await Watchlist.find({ userId: session.user.id }).sort({ addedAt: -1 });
    return NextResponse.json(watchlist);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { asteroidId, asteroidName, alertThreshold } = body;

    if (!asteroidId) {
        return NextResponse.json({ error: 'Asteroid ID required' }, { status: 400 });
    }

    await connectToDatabase();

    try {
        const newItem = await Watchlist.create({
            userId: session.user.id,
            asteroidId,
            asteroidName,
            alertThreshold,
        });
        return NextResponse.json(newItem, { status: 201 });
    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json({ error: 'Already in watchlist' }, { status: 409 });
        }
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await connectToDatabase();
    await Watchlist.findOneAndDelete({ _id: id, userId: session.user.id });

    return NextResponse.json({ success: true });
}
