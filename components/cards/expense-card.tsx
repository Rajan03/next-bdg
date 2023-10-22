import type {Expense} from ".prisma/client";
import {SlGraph} from "react-icons/sl";

export function ExpenseCard(expense: Expense) {
    return (
        <>
            <div className="flex justify-between items-center rounded-lg shadow-sm border overflow-hidden p-2">
                <p className={'text-base font-medium text-gray-700'}>{expense.name}</p>

                <div className={'flex items-center gap-x-1'}>
                    <SlGraph className={'w-4 h-4 text-red-400 rotate-180'} />
                    <p className={'text-base font-medium text-gray-700'}>{expense.amount}</p>
                </div>
            </div>
        </>
    )
}