'use client';

import {useAddMonthModal} from "@/context";

export function AddMonthAction() {
    const {open} = useAddMonthModal();

    return (
        <button onClick={open} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Start Month
        </button>
    )
}