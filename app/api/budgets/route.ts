import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
      });
    }

    const { name, amount, monthId } = await request.json();
    const month = await prisma.budget.create({
      data: {
        name,
        slug: name.toLowerCase().replace(" ", "-") + "-" + monthId,
        amount: +amount,
        month: {
          connect: {
            id: monthId,
          },
        },
      },
    });

    return NextResponse.json({
      month,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}
