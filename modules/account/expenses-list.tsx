import {GetMonthExpenses} from "@/services";
import {AddExpenseAction, ExpenseCard} from "@/components";
import {AiOutlinePlus} from "react-icons/ai";

export async function ExpensesList() {
    const expenses = await GetMonthExpenses();

    return (
        <div className={'flex flex-col gap-y-3 bg-white shadow-lg p-4 rounded-md'}>
            <div className={'flex flex-row justify-between items-center border-b pb-2'}>
                <h2 className={'text-lg font-bold'}>Expenses</h2>
                <AddExpenseAction>
                    <button className={'text-primary-700 hover:bg-primary-50 font-bold p-1 rounded'}>
                        <AiOutlinePlus size={20} />
                    </button>
                </AddExpenseAction>
            </div>

            {expenses.data && expenses.data.length
                ? expenses.data.map((e) => (
                    <ExpenseCard key={e.id} {...e} />
                ))
                : <div className={'flex-1 flex flex-col justify-center items-center'}>
                    <p className={'text-base font-medium text-gray-700'}>No Expenses found</p>
                    <p className={'text-sm text-gray-400 mt-1 mb-4'}>Create a new expense in your budget</p>

                    <AddExpenseAction />
                </div>
            }
        </div>
    )
}
