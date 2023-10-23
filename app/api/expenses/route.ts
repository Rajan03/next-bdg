import {authOptions} from "@/lib/authOptions";
import {prisma} from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({error: "unauthorized"}), {
                status: 401,
            });
        }

        const {name, amount, budgetId} = await request.json();
        const expense = await prisma.expense.create({
            data: {
                name,
                amount: +amount,
                budget: {
                    connect: {
                        id: budgetId,
                    }
                }
            },
        });

        return NextResponse.json({expense});
    } catch (error) {
        return NextResponse.json({
            error,
        });
    }
}
