'use client';

import {useMonthBudgets} from "@/context";
import type {Prisma} from ".prisma/client";
import React from "react";

type Budget = Prisma.BudgetGetPayload<{
    include: {
        expenses: true
    }
}>

export function PopulateBudgets({budgets}: { budgets: Budget[] }) {
    const {setMonthBudgets} = useMonthBudgets();
    const budgetId = typeof window !== 'undefined' && window.localStorage
        ? localStorage.getItem('budgetId')
        : null;

    React.useEffect(() => {
        let budgetsList = budgets;
        if (budgetId) {
            budgetsList = budgets.map(budget => {
                if (budget.id === budgetId) {
                    return {...budget, selected: true}
                }
                return budget
            })
        }

        setMonthBudgets(budgetsList)
    }, [budgets, setMonthBudgets])

    return null
}