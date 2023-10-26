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

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({error: "unauthorized"}), {
                status: 401,
            });
        }

        const {id, name, amount} = await request.json();
        const expense = await prisma.expense.update({
            where: {
                id,
            },
            data: {
                name,
                amount: +amount,
            },
        });

        return NextResponse.json({expense});
    } catch (error) {
        return NextResponse.json({
            error,
        }, {status: 500});
    }
}

export async function DELETE(request: Request) {
    try {
        console.log('AUTH OPTIONS CHECKING : ')
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({error: "unauthorized"}), {
                status: 401,
            });
        }

        console.log('DELETE EXPENSE REQUEST CHECK : ')
        const id = request.headers.get('id') as string;
        await prisma.expense.delete({
            where: { id },
        });

        return NextResponse.json({
            message: 'Expense deleted successfully',
        }, {status: 200});
    } catch (error) {
        console.log('ERROR DELETE EXPENSE API ROUTE : ')
        console.log(error)
        return NextResponse.json({
            error,
        }, {status: 500});
    }
}
