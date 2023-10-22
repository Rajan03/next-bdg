'use client';

import {useAddBudgetModal} from "@/context";
import React from "react";

export function AddBudgetAction({children}: { children?: React.ReactNode }) {
    const {open} = useAddBudgetModal();

    if (children) return <div onClick={open}>{children}</div>
    return (
        <button onClick={open} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Add Budget
        </button>
    )
}