'use client';

import type {Expense} from ".prisma/client";
import React from "react";
import {useMonthBudgets} from "@/context";
import {SlGraph} from "react-icons/sl";

export function ExpenseListClient({action}: { action?: React.ReactNode }) {
    const budgets = useMonthBudgets(m => m.monthBudgets);
    const selectedBudget = budgets.find(b => b.selected);

    return (
        <div className={'flex flex-col gap-y-3'}>
            {selectedBudget && selectedBudget.expenses.length
                ? selectedBudget.expenses.map((e) => (
                    <div key={e.id} className="flex justify-between items-center rounded-lg shadow-sm border overflow-hidden p-2">
                        <p className={'text-base font-medium text-gray-700'}>{e.name}</p>

                        <div className={'flex items-center gap-x-1'}>
                            <SlGraph className={'w-4 h-4 text-red-400 rotate-180'} />
                            <p className={'text-base font-medium text-gray-700'}>{e.amount}</p>
                        </div>
                    </div>
                ))
                : <div className={'flex-1 flex flex-col justify-center items-center'}>
                    <p className={'text-base font-medium text-gray-700'}>No Expenses found</p>
                    <p className={'text-sm text-gray-400 mt-1 mb-4'}>Create a new expense in your budget</p>
                    {action}
                </div>
            }
        </div>
    )
}