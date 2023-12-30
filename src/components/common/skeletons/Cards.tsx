export const LoadingCard = () => {
    return (
        <article>
            <div className=" pt-3 flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full bg-slate-200"></div>
                <div className="skeleton h-4 w-28 bg-slate-200"></div>
                <div className="skeleton h-4 w-full bg-slate-200"></div>
                <div className="skeleton h-4 w-full bg-slate-200"></div>
            </div>
        </article>
    )
}
