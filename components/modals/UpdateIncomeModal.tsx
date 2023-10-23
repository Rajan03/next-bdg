'use client';

import {AppModal} from "./RootModal";
import {useActiveMonth, useUpdateIncomeModal} from "@/context";
import React, {useMemo} from "react";
import {useRouter} from "next/navigation";
import {monthsPairs} from "@lib/constants";
import type {Month} from ".prisma/client";

export function UpdateIncomeModal() {
    const {isOpen, close} = useUpdateIncomeModal();
    const activeMonth = useActiveMonth(s => s.activeMonth);
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const incomeRef = React.useRef<HTMLInputElement>(null);
    const expenseLimitRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!activeMonth) {
            alert('No active month found');
            return;
        };
        const income = incomeRef.current?.value;
        const expenseLimit = expenseLimitRef.current?.value;

        if (!income || !expenseLimit) return;

        if (+income < 0 || +expenseLimit < 0) {
            alert('Income cannot be negative');
            return;
        }
        if (+expenseLimit > +income) {
            alert('Expense limit cannot be greater than income');
            return;
        }

        setLoading(true)
        try {
            await fetch('/api/months', {
                method: 'PUT',
                body: JSON.stringify({income, expenseLimit, monthId: activeMonth?.id}),
                headers: {'Content-Type': 'application/json'},
            });

            setLoading(false);
            router.refresh();
            close()
        } catch (err: any) {
            setLoading(false);
            alert(err.message);
        }
    }

    const mName = useMemo(() =>
        activeMonth
            ? monthsPairs.find(m =>
                m.value === +(activeMonth as Month).monthName)?.label
            : '', [activeMonth]);
    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <h2 className={"text-2xl font-semibold"}>Update Income</h2>
                    <p className={"text-gray-500 text-sm"}>
                        {mName} {activeMonth?.year} income will be updated.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Income</label>
                        <input ref={incomeRef} defaultValue={activeMonth?.income} type={"number"}
                               className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}
                               placeholder={"0.00"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Expense Limit</label>
                        <input ref={expenseLimitRef} defaultValue={activeMonth?.expenseLimit} type={"number"}
                               className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}
                               placeholder={"0.00"}/>
                    </div>

                    <div className={"flex justify-end pt-4 gap-x-4"}>
                        <button type={"button"} onClick={close}
                                className={"text-gray-500 text-sm font-semibold px-3 py-2 rounded-md shadow"}>
                            Cancel
                        </button>
                        <button disabled={loading} type={"submit"}
                                className={"bg-primary-700 text-white text-sm font-semibold px-3 py-2 rounded-md shadow disabled:bg-gray-300"}>
                            {loading ? 'Loading...' : 'Add Month'}
                        </button>
                    </div>
                </form>
            </AppModal>
        </>
    )
}