import {PageHeader, AddMonthAction} from "@/components";
import {GetMonths} from "@/services";

export default async function Month() {
    const months = await GetMonths();

    if (months && months.error) {
        return <p className={"text-red-500"}>{months.error}</p>
    }

    return (
        <>
            <PageHeader
                title={"Months"} subtitle={"You have 3 budgets"}
                actions={<AddMonthAction/>}/>

            <section className={"py-4"}>
                {months && months.data && months.data.length > 0
                    ? months.data.map((month) => (
                        <div key={month.id} className={"bg-white rounded-lg shadow-md p-4 mb-4"}>
                            <div className={"flex items-center justify-between"}>
                                <div className={"flex items-center"}>
                                    <div className={"text-sm"}>
                                        <p className={"text-gray-900 leading-none"}>
                                            {month.monthName} {month.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <p className={"text-gray-500"}>No months found</p>}
            </section>
        </>)
}