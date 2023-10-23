'use client';

import {AppModal} from "./RootModal";
import {useAddMonthModal} from "@/context";
import React from "react";
import {monthsPairs, yearPairs} from "@lib/constants";
import {useRouter} from "next/navigation";

export function AddMonthModal() {
    const {isOpen, close} = useAddMonthModal();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const monthNameRef = React.useRef<HTMLSelectElement>(null);
    const currencyRef = React.useRef<HTMLSelectElement>(null);
    const yearRef = React.useRef<HTMLSelectElement>(null);
    const incomeRef = React.useRef<HTMLInputElement>(null);
    const expenseLimitRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const monthName = monthNameRef.current?.value;
        const currency = currencyRef.current?.value;
        const year = yearRef.current?.value;
        const income = incomeRef.current?.value;
        const expenseLimit = expenseLimitRef.current?.value;

        if(!monthName || !currency || !year || !income || !expenseLimit) return;

        if (+income < 0 || +expenseLimit < 0) {
            alert('Income cannot be negative');
            return;
        }
        if (+expenseLimit > +income) {
            alert('Expense limit cannot be greater than income');
            return;
        }

        setLoading(true)
        await fetch('/api/months', {
            method: 'POST',
            body: JSON.stringify({month: monthName, currency, year, income, expenseLimit}),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false);
        router.refresh();
        close()
    }

    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <h2 className={"text-2xl font-semibold"}>Add Month</h2>
                    <p className={"text-gray-500 text-sm"}>This month will become your active month for tracking all future budgets and expenses.</p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Month Name</label>
                        <select ref={monthNameRef} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}>
                            {monthsPairs.map((month, index) => (
                                <option key={index} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Year</label>
                        <select ref={yearRef} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}>
                            {yearPairs.map((year, index) => (
                                <option key={index} value={year.value}>{year.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Currency</label>
                        <select ref={currencyRef} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}>
                            <option value={"₹"}>RS (₹)</option>
                            <option value={"$"}>USD ($)</option>
                            <option value={"€"}>EUR (€)</option>
                        </select>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Income</label>
                        <input ref={incomeRef} type={"number"} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"} placeholder={"0.00"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Expense Limit</label>
                        <input ref={expenseLimitRef} type={"number"} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"} placeholder={"0.00"}/>
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