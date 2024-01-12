interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
    return (
        <input
            className="input input-bordered input-primary w-3/4 max-w-xs"
            {...props}
        />
    )
}
