'use client';

import { AppModal } from "./RootModal";
import {useMonthBudgets, useAddExpenseModal} from "@/context";
import React from "react";

export function AddExpenseModal() {
    const { isOpen, close } = useAddExpenseModal();
    const { monthBudgets } = useMonthBudgets();
    const [loading, setLoading] = React.useState(false);

    const budgetNameRef = React.useRef<HTMLSelectElement>(null);
    const nameRef = React.useRef<HTMLInputElement>(null);
    const amountRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const budgetId = budgetNameRef.current?.value;
        const name = nameRef.current?.value;
        const amount = amountRef.current?.value;

        if (!budgetId || !amount) return;

        setLoading(true)
        await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify({ budgetId, amount, name }),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false)
        close()
    }

    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <h2 className={"text-2xl font-semibold"}>Add Expense</h2>
                    <p className={"text-gray-500 text-sm"}>Add a new expense to any budget</p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Expense At</label>
                        <input ref={nameRef} className={"w-full border border-gray-300 rounded-md px-3 py-2"} />
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Amount</label>
                        <input ref={amountRef} type={"number"} className={"w-full border border-gray-300 rounded-md px-3 py-2"} />
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Budget</label>
                        <select ref={budgetNameRef} className={"w-full border border-gray-300 rounded-md px-3 py-2"}>
                            {monthBudgets.map((budget) => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={"flex justify-end pt-4 gap-x-4"}>
                        <button type={"button"} onClick={close}
                            className={"text-gray-500 text-sm font-semibold px-3 py-2 rounded-md shadow"}>
                            Cancel
                        </button>
                        <button disabled={loading} type={"submit"}
                            className={"bg-primary-700 text-white text-sm font-semibold px-3 py-2 rounded-md shadow disabled:bg-gray-300"}>
                            {loading ? 'Loading...' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </AppModal>
        </>
    )
}