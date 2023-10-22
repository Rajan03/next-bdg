'use client';

import {AppModal} from "./RootModal";
import {useLoginModal} from "@/context";
import React from "react";
import {signIn} from "next-auth/react";

export function LoginModal() {
    const {isOpen, close} = useLoginModal();
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true)
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            await signIn('credentials', {
                email, password,
                redirect: true, callbackUrl: '/account'
            });
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <AppModal isOpen={isOpen} onClose={close}>
                <div className={"p-4 space-y-1"}>
                    <h2 className={"text-2xl font-semibold"}>Login to your Account</h2>
                    <p className={"text-gray-500 text-sm"}>
                        Login to access your monthly budgets and expenses
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4" action="#">
                    <div>
                        <label htmlFor={'email'} className={"block text-sm font-semibold mb-2"}>Email</label>
                        <input
                            type="email" name="email" id="email" placeholder="eg. example@gmail.com" ref={emailRef}
                            className="w-full border border-gray-300 rounded-md px-3 py-2" required/>
                    </div>
                    <div>
                        <label htmlFor={'password'} className={"block text-sm font-semibold mb-2"}>Password</label>
                        <input type="password" name="password" id="password" placeholder="***********" ref={passwordRef}
                               className="w-full border border-gray-300 rounded-md px-3 py-2" required/>
                    </div>

                    <button type="submit" disabled={loading}
                            className="w-full bg-primary-700 text-white text-sm font-semibold px-3 py-2 rounded-md shadow disabled:bg-gray-300">
                        {loading ? 'Loading...' : 'Sign in to your account'}
                    </button>
                </form>
            </AppModal>
        </>
    )
}