import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { authOptions } from "@lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user)) {
      return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
      });
    }

    const { month, currency, year, income, expenseLimit } = await request.json() as {month: string, currency: string, year: number, income: number, expenseLimit: number};
    const newMonth = await prisma.month.create({
      data: {
        monthName: month,
        slug: `${month}-${year}`,
        currency,
        year: +year,
        current: true,
        income: +income,
        expenseLimit: +expenseLimit,
        user: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });

    return NextResponse.json({
      month: newMonth,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}
