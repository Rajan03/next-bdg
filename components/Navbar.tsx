import Link from "next/link";

export function Navbar() {
    const navLink = 'text-sm text-gray-500 hover:text-primary-500'
    return (
        <nav className={'w-full fixed top-0 h-20 bg-white shadow-lg shadow-gray-100'}>
            <div className={'h-full container mx-auto flex justify-between items-center px-6'}>
                <p className={"text-primary-700"}>App Name</p>
                <ul className={'flex justify-between items-center gap-x-8'}>
                    <li className={navLink}>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </li>
                    <li className={navLink}>
                        <Link href={'/budgets'}>Budget</Link>
                    </li>
                    <li className={navLink}>
                        <Link href={'/expenses'}>Expense</Link>
                    </li>
                    <li className={navLink}>
                        <Link href={'/months'}>Month</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}