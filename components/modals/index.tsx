import {AddBudgetModal} from "./AddBudgetModal";
import {AddMonthModal} from "./AddMonthModal";
import {UpdateIncomeModal} from "./UpdateIncomeModal";
import {AddExpenseModal} from "./AddExpenseModal";
import {LoginModal} from "./LoginModal";
import {UpdateExpenseModal} from "./EditExpenseModal";

export function ModalRegistry() {
    return (
        <>
            <AddMonthModal/>
            <AddBudgetModal/>
            <AddExpenseModal/>
            <LoginModal/>
            <UpdateIncomeModal/>
            <UpdateExpenseModal/>
        </>
    )
}