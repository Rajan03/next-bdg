import {GetMonthBudgets} from "@/services";
import {AddBudgetAction, BudgetCard, PopulateBudgets} from "@/components";
import {AiOutlinePlus} from "react-icons/ai";

export async function BudgetList({monthId}: { monthId: string }) {
    const budgets = await GetMonthBudgets(monthId);

    const total = budgets.data.reduce((acc, budget) => acc + budget.amount, 0);
    const expenses = budgets.data.reduce((acc, budget) =>
        acc + budget.expenses.reduce((acc, expense) => acc + expense.amount, 0), 0);

    return (
        <div className={'flex flex-col bg-white shadow-lg rounded-md max-h-[60vh] overflow-hidden'}>
            <PopulateBudgets budgets={budgets.data}/>
            <div className={'flex flex-row justify-between items-center border-b p-4 pb-2'}>
                <div className={'flex flex-col'}>
                    <h2 className={'text-lg font-bold'}>
                        Budgets
                    </h2>
                    <p className={'text-sm text-gray-400'}>
                        {budgets.data.length} budgets - {total - expenses} remaining
                    </p>
                </div>
                <AddBudgetAction>
                    <button className={'text-primary-700 hover:bg-primary-50 font-bold p-1 rounded'}>
                        <AiOutlinePlus size={20}/>
                    </button>
                </AddBudgetAction>
            </div>

            <div className={'flex flex-col gap-y-3 mt-4 flex-1 overflow-auto p-4 pt-1'}>
                {budgets.data && budgets.data.length
                    ? budgets.data.map((budget) => (
                        <BudgetCard key={budget.id} {...budget} />
                    ))
                    : <div className={'flex-1 flex flex-col justify-center items-center'}>
                        <p className={'text-base font-medium text-gray-700'}>No budgets found</p>
                        <p className={'text-sm text-gray-400 mt-1 mb-4'}>Create a new budget to start tracking your
                            expenses</p>

                        <AddBudgetAction/>
                    </div>}
            </div>
        </div>
    )
}
