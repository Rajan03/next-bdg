import {create} from "zustand";
import type {Budget, Month} from ".prisma/client";


interface ActiveMonthStore {
    activeMonth: Month | null;
    setActiveMonth: (activeMonth: Month) => void;
}

export const useActiveMonth = create<ActiveMonthStore>((set) => ({
    activeMonth: null,
    setActiveMonth: (activeMonth: Month) => set({activeMonth}),
}));

interface BudgetStore {
    monthBudgets: Budget[];
    setMonthBudgets: (monthBudgets: Budget[]) => void;
}
export const useMonthBudgets = create<BudgetStore>((set) => ({
    monthBudgets: [],
    setMonthBudgets: (monthBudgets: Budget[]) => set({monthBudgets}),
}));