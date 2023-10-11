'use client';

import {AppModal} from "./RootModal";
import {useAddMonthModal} from "@/context";
import React from "react";

export function AddMonthModal() {
    const {isOpen, close} = useAddMonthModal();
    const [loading, setLoading] = React.useState(false);

    const monthNameRef = React.useRef<HTMLInputElement>(null);
    const currencyRef = React.useRef<HTMLSelectElement>(null);
    const yearRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const monthName = monthNameRef.current?.value;
        const currency = currencyRef.current?.value;
        const year = yearRef.current?.value;

        if(!monthName || !currency || !year) return;

        setLoading(true)
        await fetch('/api/months', {
            method: 'POST',
            body: JSON.stringify({month: monthName, currency, year}),
            headers: { 'Content-Type': 'application/json' },
        });

        setLoading(false)
        close()
    }

    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4"}>
                    <h2 className={"text-2xl font-semibold"}>Add Month</h2>
                    <p className={"text-gray-500 text-sm"}>Add a new month to your budget</p>
                </div>

                <form onSubmit={handleSubmit} className={"p-4 space-y-4"}>
                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Month Name</label>
                        <input ref={monthNameRef} type={"text"} className={"w-full border border-gray-300 rounded-md px-3 py-2"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Year</label>
                        <input ref={yearRef} type={"number"} className={"w-full border border-gray-300 rounded-md px-3 py-2"}/>
                    </div>

                    <div>
                        <label className={"block text-sm font-semibold mb-2"}>Currency</label>
                        <select ref={currencyRef} className={"w-full text-sm bg-transparent border border-gray-300 rounded-md px-3 py-2"}>
                            <option value={"₹"}>RS (₹)</option>
                            <option value={"$"}>USD ($)</option>
                            <option value={"€"}>EUR (€)</option>
                        </select>
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