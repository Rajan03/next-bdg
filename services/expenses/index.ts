import {prisma} from "@lib/prisma";
import type {Expense} from ".prisma/client";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@lib/authOptions";

export async function GetMonthExpenses(budgetId: string): Promise<{
    data: Expense[] | null;
    error: string | null;
}> {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return {
                error: "You must be logged in to do this.",
                data: null
            }
        }

        const expenses = await prisma.expense.findMany({
            where: {
                budgetId: budgetId,
            },
            include: {
                budget: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return {
            data: expenses,
            error: null,
        };
    } catch (error: any) {
        return {
            data: [],
            error: error.message || 'An error occurred while fetching the expenses.'
        };
    }
}

export async function GetTotalExpend(monthId: string): Promise<{
    data: number | null;
    error: string | null;
}> {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return {
                error: "You must be logged in to do this.",
                data: null
            }
        }

        const budgets = await prisma.budget.findMany({
            where: {
                monthId: monthId,
            },
            include: {
                expenses: true,
            }
        });

        if (!budgets || budgets.length === 0) {
            return {
                data: 0,
                error: null,
            };
        }

        let total = 0;
        budgets.forEach(b => b.expenses.forEach(expense => total += expense.amount))

        return {
            data: total,
            error: null,
        };
    } catch (error: any) {
        return {
            data: 0,
            error: error.message || 'An error occurred while fetching the expenses.'
        };
    }
}