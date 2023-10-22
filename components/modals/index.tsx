import { AddBudgetModal } from "./AddBudgetModal";
import { AddMonthModal } from "./AddMonthModal";
import {AddExpenseModal} from "./AddExpenseModal";
import { LoginModal } from "./LoginModal";

export function ModalRegistry() {
    return (
        <>
            <AddMonthModal />
            <AddBudgetModal />
            <AddExpenseModal />
            <LoginModal />
        </>
    )
}