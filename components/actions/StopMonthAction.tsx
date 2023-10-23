'use client';

import React from "react";
import {StopMonth} from "@/services";
import {useRouter} from "next/navigation";
import {useActiveMonth} from "@/context";

export function StopMonthAction({children}: { children?: React.ReactNode }) {
    const router = useRouter();
    const activeMonth = useActiveMonth(s => s.activeMonth)
    const stopMonth = async () => {
        const month = await fetch("/api/months", {
            method: "DELETE",
            headers: {monthId: activeMonth?.id} as any
        });
        const stoppedMonth = await month.json();

        if (stoppedMonth && !stoppedMonth.error) {
            router.refresh();
        }

        if (stoppedMonth.error) {
            alert(stoppedMonth.error);
        }
    }

    if (children) return <div onClick={stopMonth}>{children}</div>

    return (
        <button onClick={stopMonth} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Stop this month
        </button>
    )
}