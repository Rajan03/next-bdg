import React from "react";
import {AddExpenseAction, ExpenseCard} from "@/components";
import {AiOutlinePlus} from "react-icons/ai";
import {GetMonthExpenses} from "@/services";
import {Expense} from ".prisma/client";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function ExpensesList(props: Props) {
    const budgetId = props.searchParams.budget as string;
    const expenses = budgetId
        ? await GetMonthExpenses(budgetId)
        : null;

    const totalExpense = expenses && expenses.data && expenses.data.length
        ? expenses.data.reduce((acc, expense) => acc + expense.amount, 0)
        : 0;
    return (
        <div className={'flex flex-col bg-white shadow-lg rounded-md max-h-[60vh] overflow-hidden'}>
            <div className={'flex flex-row justify-between items-center border-b p-4 pb-2'}>
                <div className={'flex flex-col'}>
                    <h2 className={'text-lg font-bold'}>
                        Expenses
                    </h2>
                    <p className={'text-sm text-gray-400'}>
                        {expenses && expenses.data ? expenses.data.length : 0} expenses - {totalExpense} spent
                    </p>
                </div>
                <AddExpenseAction>
                    <button className={'text-primary-700 hover:bg-primary-50 font-bold p-1 rounded'}>
                        <AiOutlinePlus size={20}/>
                    </button>
                </AddExpenseAction>
            </div>

            <div className={'flex flex-col gap-y-3 mt-4 flex-1 overflow-auto p-4 pt-1'}>
                {!budgetId
                    ? <div className={'flex-1 flex flex-col justify-center items-center'}>
                        <p className={'text-base font-medium text-gray-700'}>No Budget Selected</p>
                        <p className={'text-sm text-gray-400 mt-1 mb-4'}>
                            Select a budget to start tracking your expenses
                        </p>
                    </div>
                    : <List expenses={expenses && expenses.data ? expenses.data : []}/>
                }
            </div>
        </div>
    )
}

async function List({expenses}: { expenses: Expense[] }) {
    return expenses && expenses.length
        ? expenses.map((e) => (
            <ExpenseCard {...e} key={e.id}/>
        ))
        : <div className={'flex-1 flex flex-col justify-center items-center'}>
            <p className={'text-base font-medium text-gray-700'}>No Expenses found</p>
            <p className={'text-sm text-gray-400 mt-1 mb-4'}>Create a new expense in your budget</p>

            <AddExpenseAction/>
        </div>
}