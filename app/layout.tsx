import {ModalRegistry, Navbar} from "@/components";
import React from "react";
import './globals.css'
import {Providers} from "@/providers";

export const metadata = {
    title: 'App',
    description: 'Track your budgets and expenses with this app'
}

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={'bg-gray-50'}>
        <Providers>
            <Navbar/>
            <ModalRegistry/>
            <main className={'h-screen container mx-auto px-6 pt-20'}>
                {children}
            </main>
        </Providers>
        </body>
        </html>
    )
}

/*
Client Side Session Management
  const { data: session } = useSession()

Server Side Session Management
  const session = await getServerSession(authOptions)
*/