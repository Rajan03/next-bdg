import {prisma} from "@/lib/prisma";
import type {Prisma} from ".prisma/client";

type Budget = Prisma.BudgetGetPayload<{
    include: {
        expenses: true
    }
}>

export async function GetMonthBudgets(monthId: string): Promise<{
    data: Budget[];
    success: boolean;
}> {
    try {
        const budgets = await prisma.budget.findMany({
            where: {
                monthId: monthId
            },
            include: {
                expenses: true,
            }
        });
        console.log(budgets);

        return {
            data: budgets,
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            data: [],
            success: false,
        };
    }
}
