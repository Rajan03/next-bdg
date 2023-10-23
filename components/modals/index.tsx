import { AddBudgetModal } from "./AddBudgetModal";
import { AddMonthModal } from "./AddMonthModal";
import {UpdateIncomeModal} from "./UpdateIncomeModal";
import {AddExpenseModal} from "./AddExpenseModal";
import { LoginModal } from "./LoginModal";

export function ModalRegistry() {
    return (
        <>
            <AddMonthModal />
            <AddBudgetModal />
            <AddExpenseModal />
            <LoginModal />
            <UpdateIncomeModal />
        </>
    )
}