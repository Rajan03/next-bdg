import type {Expense} from ".prisma/client";
import {SlGraph} from "react-icons/sl";
import {EditExpenseAction} from "@/components";
import {AiFillEdit} from "react-icons/ai";
import React from "react";

export function ExpenseCard(e: Expense) {
    return (
        <>
            <div key={e.id}
                 className="group relative flex justify-between items-center rounded-lg shadow-sm border overflow-hidden p-2 min-h-[3rem]">
                <p className={'text-base font-medium text-gray-700'}>{e.name}</p>

                <div className={'flex items-center gap-x-1'}>
                    <SlGraph className={'w-4 h-4 text-red-400 rotate-180'}/>
                    <p className={'text-base font-medium text-gray-700'}>{e.amount}</p>
                </div>

                <EditExpenseAction data={e} className={"hidden group-hover:block absolute bg-primary-700 text-sm text-white p-1 " +
                    "rounded-md shadow right-2"}>
                    <AiFillEdit className={'w-4 h-4 text-white'}/>
                </EditExpenseAction>
            </div>
        </>
    )
}