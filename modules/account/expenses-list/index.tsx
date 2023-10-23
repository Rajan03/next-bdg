import {AddExpenseAction} from "@/components";
import {AiOutlinePlus} from "react-icons/ai";
import {ExpenseListClient} from "./list-expesnses";

export async function ExpensesList() {
    return (
        <div className={'flex flex-col gap-y-3 bg-white shadow-lg p-4 rounded-md'}>
            <div className={'flex flex-row justify-between items-center border-b pb-2'}>
                <h2 className={'text-lg font-bold'}>Expenses</h2>
                <AddExpenseAction>
                    <button className={'text-primary-700 hover:bg-primary-50 font-bold p-1 rounded'}>
                        <AiOutlinePlus size={20}/>
                    </button>
                </AddExpenseAction>
            </div>

            <ExpenseListClient action={<AddExpenseAction />} />
        </div>
    )
}
