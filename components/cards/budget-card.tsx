'use client';

import {Prisma} from ".prisma/client";
import {useActiveMonth, useMonthBudgets} from "@/context";

type Budget = Prisma.BudgetGetPayload<{
    include: {
        expenses: true
    }
}>

export function BudgetCard(props: Budget) {
    const {name, amount, expenses} = props;
    const currency = useActiveMonth(m => m.activeMonth?.currency) || '';
    const {budgets, setBudgets} = useMonthBudgets(m => ({budgets: m.monthBudgets, setBudgets: m.setMonthBudgets}));



    // Calculate spent amount
    const spent = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0);

    // Calculate percentage
    const percentage = (spent / amount) * 100;

    // Set selected budget
    const setSelectedCard = () => {
       setBudgets(budgets.map(b => {
           if (b.id === props.id) {
               localStorage.setItem('budgetId', b.id);
           }
           return {
               ...b,
               selected: b.id === props.id
           }
       }));
    }
    return (
        <div onClick={setSelectedCard} className={'flex flex-col bg-red-30s0 p-4 rounded-lg shadow'}>
            {/* Title and Amount */}
            <div className={'flex flex-row justify-between items-center'}>
                <h3 className={'text-lg font-bold'}>{name}</h3>
                <p className={'text-lg font-bold'}>{currency + amount}</p>
            </div>

            {/* Spent and Remaining Label */}
            <div className={'flex flex-row justify-between items-center mt-3'}>
                <p className={'text-base text-gray-400'}>Spent</p>
                <p className={'text-base text-gray-400'}>Remaining</p>
            </div>

            {/* Slider */}
            <div className={'flex flex-row justify-between items-center mt-1'}>
                <div className={'flex-1'}>
                    <div className={'h-2 bg-gray-200 rounded-full'}>
                        <div className={'h-2 bg-primary-700 rounded-full'}
                             style={{width: `${percentage || '1'}%`}} />
                    </div>
                    <p className={'text-sm text-gray-400 mt-1'}>{percentage.toFixed(2)}%</p>
                </div>
            </div>
        </div>
    )
}