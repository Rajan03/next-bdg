'use client'

import type {Month} from ".prisma/client";
import React from "react";
import {useActiveMonth} from "@/context";

export function ActiveMonth(month: Month) {
    const {setActiveMonth} = useActiveMonth();

    React.useEffect(() => {
        setActiveMonth(month)
    }, [month, setActiveMonth])

    return null
}