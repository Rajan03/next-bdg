
type PageHeaderProps = {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
}
export function PageHeader({title, subtitle, actions}: PageHeaderProps) {
    return (
        <div className={"flex justify-between items-end py-4 border-b"}>
            <div className={"flex flex-col"}>
                <h1 className={"text-xl font-semibold"}>{title}</h1>
                {subtitle && <p className={"text-gray-500 text-sm"}>{subtitle}</p>}
            </div>

            {actions && <div className={"flex items-center gap-x-4"}>{actions}</div>}
        </div>
    )
}