'use client';

import {useLoginModal} from "@/context";

export function LoginAction() {
    const {open} = useLoginModal();

    return (
        <button onClick={open} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
            Login
        </button>
    )
}