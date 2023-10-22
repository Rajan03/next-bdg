'use client';

import {useMonthBudgets} from "@/context";
import type {Budget} from ".prisma/client";
import React from "react";

export function PopulateBudgets({budgets}: { budgets: Budget[] }) {
    const {setMonthBudgets} = useMonthBudgets();

    React.useEffect(() => {
        setMonthBudgets(budgets)
    }, [budgets, setMonthBudgets])

    return null
}