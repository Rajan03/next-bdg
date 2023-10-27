'use client';

import {useActiveMonth} from "@/context";

interface TwoHeadingProps {
    title: string
    length: string
    subtitle: string
    withCurrency: boolean
}

export function TwoHeading({title, length, subtitle, withCurrency}: TwoHeadingProps) {
    const month = useActiveMonth(s => s.activeMonth);
    const secondaryLine = !withCurrency
        ? `${length} - ${subtitle}`
        : `${length} - ${(month ? month.currency : '') + subtitle}`

    return (
        <>
            <div className={'flex flex-col'}>
                <h2 className={'text-lg font-bold'}>
                    {title}
                </h2>
                <p className={'text-sm text-gray-400'}>
                    {secondaryLine}
                </p>
            </div>
        </>
    )
}