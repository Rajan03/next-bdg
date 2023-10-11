import {create} from "zustand";
import {ModalState} from "@/types";

export const useAddMonthModal = create<ModalState>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}));