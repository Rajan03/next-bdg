import {getServerSession} from "next-auth/next";
import {NextResponse} from "next/server";
import {prisma} from "@lib/prisma";
import {authOptions} from "@lib/authOptions";
import {GetMonths} from "@/services";

export async function GET(request: Request) {


    return NextResponse.json({ months: GetMonths() })
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || (session && !session.user)) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
            status: 401
        })
    }

    const {month, currency, year} = await request.json();
    const newMonth = await prisma.month.create({
        data: {
            monthName: month,
            currency,
            year: +year,
            user: {
                connect: {
                    id: session.user?.id
                }
            }
        }
    });

    return NextResponse.json({
        month: newMonth
    })
}