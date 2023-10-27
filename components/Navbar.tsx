import {LoginAction, LogOutAction} from "@/components";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@lib/authOptions";

export async function Navbar() {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
        return (
            <AuthenticatedNavbar/>
        )
    }

    return (
        <UnAuthenticatedNavbar/>
    )
}

export function UnAuthenticatedNavbar() {
    return (
        <nav className={'w-full fixed top-0 h-20 bg-white shadow-lg shadow-gray-100 z-50'}>
            <div className={'h-full container mx-auto flex justify-between items-center px-6'}>
                <p className={"text-primary-700"}>
                    Money Marvel
                </p>

                <LoginAction/>
            </div>
        </nav>
    )
}

export function AuthenticatedNavbar() {
    return (
        <>
            <nav className={'w-full fixed top-0 h-20 bg-white shadow-lg shadow-gray-100 z-50'}>
                <div className={'h-full container mx-auto flex justify-between items-center px-6'}>
                    <p className={"text-primary-700"}>Money Marvel</p>
                    <LogOutAction/>
                </div>
            </nav>
        </>
    )
}