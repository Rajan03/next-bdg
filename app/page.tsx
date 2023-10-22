import {LoginAction} from "@/components";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@lib/authOptions";


export default async function Page() {
    const session = await getServerSession(authOptions)

    if (session && session.user) {
        return (
            <>s</>
        )
    }


    return (
        <section>
            <LoginAction/>
        </section>
    )
}