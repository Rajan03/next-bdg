'use client';

import {Prisma} from ".prisma/client";
import {useActiveMonth} from "@/context";
import {useRouter, useSearchParams} from "next/navigation";

type Budget = Prisma.BudgetGetPayload<{
    include: {
        expenses: true
    }
}>

export function BudgetCard(props: Budget) {
    const {name, amount, expenses} = props;
    const currency = useActiveMonth(m => m.activeMonth?.currency) || '';
    const params = useSearchParams();
    const {replace} = useRouter();

    // Calculate remaining amount
    const remaining = amount - expenses.reduce((acc, expense) => {
        return acc + expense.amount > amount ? amount : acc + expense.amount;
    }, 0);

    // Calculate spent amount
    const spent = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0);

    // Calculate percentage
    const percentage = (spent / amount) * 100;

    // Set selected budget
    const setSelectedCard = () => {
        const searchParams = new URLSearchParams(params.toString());
        searchParams.set('budget', props.id);
        replace(`?${searchParams.toString()}`);
    }

    return (
        <div onClick={setSelectedCard} className={`flex flex-col bg-red-30s0 p-4 rounded-lg shadow cursor-pointer border 
             ${percentage > 100 ? 'border-red-200 hover:bg-red-50' : 'border-gray-100 hover:bg-gray-50'}`}>
            {/* Title and Amount */}
            <div className={'flex flex-row justify-between items-center'}>
                <h3 className={'text-lg font-bold'}>{name}</h3>
                <p className={'text-lg font-bold'}>{currency + amount}</p>
            </div>

            {/* Spent and Remaining Label */}
            <div className={'flex flex-row justify-between items-center mt-2'}>
                <p className={'text-sm text-gray-400'}>
                    Spent - {currency + spent}
                </p>
                <p className={'text-sm text-gray-400'}>
                    Remaining - {currency + remaining}
                </p>
            </div>

            {/* Slider */}
            <div className={'flex flex-row justify-between items-center mt-1'}>
                <div className={'flex-1'}>
                    <div className={'h-1 bg-gray-200 rounded-full overflow-hidden'}>
                        <div className={`h-1 rounded-full ${percentage > 100 ? 'bg-red-600': 'bg-primary-600'}`}
                             style={{width: `${percentage || '1'}%`}} />
                    </div>

                    <div className={'flex flex-row justify-between items-center mt-1'}>
                        <p className={`text-xs text-gray-400 mt-1 ${percentage > 100 ? 'text-red-600': ''}`}>
                            {percentage.toFixed(2)}%
                        </p>
                        <p className={`text-xs text-gray-400 mt-1 ${percentage > 100 ? 'text-red-600': ''}`}>
                            Over budget
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}