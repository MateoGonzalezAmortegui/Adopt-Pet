export const ModalLoading = ({
    tittle,
    text,
}: {
    tittle: string
    text: string
}) => {
    return (
        <dialog
            id="my_modal_Loading"
            className="modal"
        >
            <div className="modal-box">
                <span className="loading loading-bars loading-lg"></span>
                <h3 className="font-bold text-lg">{tittle}</h3>
                <p className="py-4">{text}</p>
            </div>
        </dialog>
    )
}
