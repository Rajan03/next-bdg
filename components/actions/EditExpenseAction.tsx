'use client';

import {useUpdateExpenseModal} from "@/context";
import React from "react";
import type {Expense} from ".prisma/client";

export function EditExpenseAction({children, data, className}: { children?: React.ReactNode, data: Expense, className?: string }) {
    const {openWithData} = useUpdateExpenseModal();

    const open = () => {
        openWithData(data);
    }

    if (children) return <button onClick={open} className={className}>{children}</button>

    return (
        <button onClick={open} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Update Expense
        </button>
    )
}