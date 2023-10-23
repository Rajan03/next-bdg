import {prisma} from "@lib/prisma";
import type {Expense} from ".prisma/client";

export async function GetMonthExpenses(): Promise<{
    data: Expense[];
    success: boolean;
}> {
    try {
        const expenses = await prisma.expense.findMany({
            include: {
                budget: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return {
            data: expenses,
            success: true,
        };
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
}