'use client';

import React from "react";
import {useRouter} from "next/navigation";
import {AppModal} from "./RootModal";
import {useMonthBudgets, useUpdateExpenseModal} from "@/context";
import {AiFillDelete} from "react-icons/ai";

export function UpdateExpenseModal() {
    const {isOpen, data, close} = useUpdateExpenseModal();
    const {monthBudgets} = useMonthBudgets();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()

    const nameRef = React.useRef<HTMLInputElement>(null);
    const amountRef = React.useRef<HTMLInputElement>(null);
    const budgetNameRef = React.useRef<HTMLSelectElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const amount = amountRef.current?.value;

        if (!name || !amount) return;

        setLoading(true)
        await fetch('/api/expenses', {
            method: 'PUT',
            body: JSON.stringify({id: data.id, amount, name}),
            headers: {'Content-Type': 'application/json'},
        });

        setLoading(false)
        router.refresh();
        close()
    }

    const handleDelete = async () => {
        setLoading(true)
        if (!data) return;

        try {
            await fetch('/api/expenses', {
                method: 'DELETE',
                headers: {id: data.id, 'Content-Type': 'application/json'},
            });

            setLoading(false)
            router.refresh();
            close()
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    if (!data) return null;
    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <div className="flex justify-between items-center">
                        <h2 className={"text-2xl font-semibold"}>Edit Expense</h2>

                        <button onClick={handleDelete} disabled={loading} className={"bg-red-700 disabled:bg-gray-500 text-sm text-white p-1 rounded-md shadow"}>
                            <AiFillDelete className={'w-4 h-4 text-white'}/>
                        </button>
                    </div>
                    <p className={"text-gray-500 text-sm"}>Edit existing expense to your budget</p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Expense At</label>
                        <input ref={nameRef} defaultValue={data.name}
                               className={"w-full border border-gray-300 rounded-md px-3 py-2"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Amount</label>
                        <input ref={amountRef} defaultValue={data.amount} type={"number"}
                               className={"w-full border border-gray-300 rounded-md px-3 py-2"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Budget</label>
                        <select ref={budgetNameRef} defaultValue={data.budgetId} disabled
                                className={"w-full border border-gray-300 rounded-md px-3 py-2 " +
                                    "disabled:bg-gray-100 disabled:cursor-not-allowed"}>
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
                            {loading ? 'Loading...' : 'Update Expense'}
                        </button>
                    </div>
                </form>
            </AppModal>
        </>
    )
}