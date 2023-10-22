'use client';

import {signOut} from "next-auth/react";

export function LogOutAction() {
    const onClick = () => signOut();

    return (
        <>
            <button onClick={onClick} className={"bg-primary-700 text-sm text-white px-3 py-1 rounded-md shadow"}>
                Logout
            </button>
        </>
    )
}