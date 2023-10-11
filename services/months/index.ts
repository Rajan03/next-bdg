import {getServerSession} from "next-auth/next";
import {authOptions} from "@lib/authOptions";
import {prisma} from "@lib/prisma";

export async function GetMonths() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return {
            error: "You must be logged in to do this.",
            data: null
        }
    }

    return {
        error: null,
        data: await prisma.month.findMany({
            where: {
                userId: session.user?.id
            }
        })
    };
}