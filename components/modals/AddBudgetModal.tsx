'use client';

import { AppModal } from "./RootModal";
import {useActiveMonth, useAddBudgetModal} from "@/context";
import React from "react";

export function AddBudgetModal() {
    const { isOpen, close } = useAddBudgetModal();
    const { activeMonth } = useActiveMonth();
    const [loading, setLoading] = React.useState(false);

    const budgetNameRef = React.useRef<HTMLInputElement>(null);
    const amountRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = budgetNameRef.current?.value;
        const amount = amountRef.current?.value;

        if (!name || !amount || !activeMonth?.id) return;

        setLoading(true)
        await fetch('/api/budgets', {
            method: 'POST',
            body: JSON.stringify({ name, amount, monthId: activeMonth.id }),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false)
        close()
    }

    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <h2 className={"text-2xl font-semibold"}>Add Budget</h2>
                    <p className={"text-gray-500 text-sm"}>Add a new budget to your month</p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Budget Name</label>
                        <input ref={budgetNameRef} type={"text"} className={"w-full border border-gray-300 rounded-md px-3 py-2"} />
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Amount</label>
                        <input ref={amountRef} type={"number"} className={"w-full border border-gray-300 rounded-md px-3 py-2"} />
                    </div>

                    <div className={"flex justify-end pt-4 gap-x-4"}>
                        <button type={"button"} onClick={close}
                            className={"text-gray-500 text-sm font-semibold px-3 py-2 rounded-md shadow"}>
                            Cancel
                        </button>
                        <button disabled={loading} type={"submit"}
                            className={"bg-primary-700 text-white text-sm font-semibold px-3 py-2 rounded-md shadow disabled:bg-gray-300"}>
                            {loading ? 'Loading...' : 'Add Budget'}
                        </button>
                    </div>
                </form>
            </AppModal>
        </>
    )
}