import {PageHeader} from "@/components";

export default function Budgets() {
    return (
        <>
            <PageHeader
                title={"Budgets"} subtitle={"You have 3 budgets"}
                actions={<button className={"bg-primary-7000 text-sm text-white px-3 py-1 rounded-md shadow"}>
                    Create Budget
                </button>}/>

            <section className={"py-4"}>

            </section>
        </>
    )
}