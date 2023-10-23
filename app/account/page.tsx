import {GetActiveMonth} from "@/services";
import {ActiveMonth, AddMonthAction} from "@/components";
import {monthsPairs} from "@lib/constants";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@lib/authOptions";
import {BudgetList, ExpensesList} from "@/modules";

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return (
            <section className={'h-full flex justify-center items-center flex-col'}>
                <h2 className={'text-2xl font-bold mb-1'}>You are not logged in</h2>
                <p className={'text-base text-gray-400 mb-6'}>Login to start tracking your expenses</p>
            </section>
        )
    }

    const currentMonth = await GetActiveMonth();
    if (!currentMonth || !currentMonth.data || currentMonth.error) {
        return (
            <section className={'h-full flex justify-center items-center flex-col'}>
                <h2 className={'text-2xl font-bold mb-1'}>No active month found</h2>
                <p className={'text-base text-gray-400 mb-6'}>Create a new month to start tracking your expenses</p>
                <AddMonthAction/>
            </section>
        )
    }

    const month = monthsPairs.find((month) => month.value === +currentMonth.data.monthName) as LabelValue;
    return (
        <>
            <ActiveMonth {...currentMonth.data} />
            <section className={'h-full flex justify-start items-start flex-col py-4'}>
                <div className={'flex flex-col justify-start gap-y-1 w-full'}>
                    <h2 className={'text-2xl font-bold'}>
                        Hello {session.user.name}!
                    </h2>
                    <p className={'text-base text-gray-400'}>
                        Welcome to your dashboard where you can track your budgets and expenses
                    </p>
                    <hr/>
                </div>

                <div className={'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full mt-8'}>
                    {/* Month Card */}
                    <CardUI title={'Active Month - ' + month.label} description={'This is your active month'}>
                        <button
                            className={'bg-primary-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6'}>
                            Stop this month
                        </button>
                    </CardUI>

                    {/* Income Card */}
                    <CardUI title={'Income - ' + currentMonth.data.currency + currentMonth.data.income}
                            description={'This is your active month income available for expenses'}>
                        <button
                            className={'bg-primary-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6'}>
                            Update income
                        </button>
                    </CardUI>

                    {/* Expense Available Card */}
                    <CardUI title={'Expense Limit - ' + currentMonth.data.currency + currentMonth.data.expenseLimit}
                            description={'This is your active month expenses available'}/>

                    {/* Budgets Card */}
                    <CardUI title={currentMonth.data.budgets?.length + ' Budgets Planned'}
                            description={'Planned budgets for this month'}/>
                </div>

                <div className={'flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-8'}>
                    <BudgetList monthId={currentMonth.data.id}/>
                    <ExpensesList />
                </div>
            </section>
        </>
    )
}

function CardUI({title, description, children}: { title: string, description: string, children?: React.ReactNode }) {
    return (
        <div
            className={'bg-white p-3 shadow-lg border border-gray-100 rounded-lg flex flex-col justify-start gap-y-1 w-full'}>
            <div className={'flex-1 flex flex-col justify-star gap-y-2'}>
                <h2 className={'text-xl font-bold'}>
                    {title}
                </h2>
                <p className={'text-base text-gray-400'}>
                    {description}
                </p>
            </div>
            {children}
        </div>
    )
}