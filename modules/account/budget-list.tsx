import {GetMonthBudgets} from "@/services";
import {AddBudgetAction, BudgetCard, PopulateBudgets} from "@/components";
import {AiOutlinePlus} from "react-icons/ai";

export async function BudgetList({monthId}: { monthId: string }) {
    const budgets = await GetMonthBudgets(monthId);

    return (
        <div className={'flex flex-col gap-y-3 bg-white shadow-lg p-4 rounded-md'}>
            <PopulateBudgets budgets={budgets.data} />
            <div className={'flex flex-row justify-between items-center border-b pb-2'}>
                <h2 className={'text-lg font-bold'}>Budgets</h2>
                <AddBudgetAction>
                    <button className={'text-primary-700 hover:bg-primary-50 font-bold p-1 rounded'}>
                        <AiOutlinePlus size={20} />
                    </button>
                </AddBudgetAction>
            </div>

            {budgets.data && budgets.data.length
                ? budgets.data.map((budget) => (
                    <BudgetCard key={budget.id} {...budget} />
                ))
                : <div className={'flex-1 flex flex-col justify-center items-center'}>
                    <p className={'text-base font-medium text-gray-700'}>No budgets found</p>
                    <p className={'text-sm text-gray-400 mt-1 mb-4'}>Create a new budget to start tracking your expenses</p>

                    <AddBudgetAction />
                </div>
            }
        </div>
    )
}
