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

export async function GetMostRecentExpenseFromMonth(month: string): Promise<{
    data: Expense | null;
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

        const monthExpenses = await prisma.month.findFirst({
            where: {
                id: month,
            },
            include: {
                budgets: {
                    include: {
                        expenses: {
                            orderBy: {
                                createdAt: "desc",
                            },
                            take: 1,
                        }
                    },
                }
            }
        })
        if (!monthExpenses || !monthExpenses.budgets?.length || !monthExpenses.budgets[0].expenses?.length) {
            return {
                data: null,
                error: "No expenses found for this month."
            }
        }

        return {
            data: monthExpenses.budgets[0].expenses[0],
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message || 'An error occurred while fetching the expenses.'
        };
    }
}