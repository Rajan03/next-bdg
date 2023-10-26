import {create} from "zustand";
import {ModalState} from "@/types";

export const useLoginModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export const useAddMonthModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export const useAddBudgetModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export const useAddExpenseModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

export const useUpdateIncomeModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));

interface UpdateModalState extends ModalState {
    data: any
    openWithData: (data: any) => void
}
export const useUpdateExpenseModal = create<UpdateModalState>((set) => ({
    isOpen: false,
    data: null,
    openWithData: (data) => set({isOpen: true, data}),
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));