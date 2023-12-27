export const ButtonPrimary = ({ text }: { text: string }) => {
    return (
        <button className="btn btn-outline btn-primary dark:btn-ghost">
            {text}
        </button>
    )
}
export const ButtonSecondary = ({ text }: { text: string }) => {
    return (
        <button className="btn btn-outline btn-secondary dark:btn-ghost">
            {text}
        </button>
    )
}
