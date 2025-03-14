'use client';

import {useAddMonthModal} from "@/context";
import React from "react";

export function AddMonthAction({children}: { children?: React.ReactNode }) {
    const {open} = useAddMonthModal();

    if (children) return <div onClick={open}>{children}</div>
    return (
        <button onClick={open} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Start Month
        </button>
    )
}