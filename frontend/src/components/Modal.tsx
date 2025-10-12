interface ModalProps {
    variant: "AddSub" | "EditSub" | "Confirm"
    open: boolean;
    onClose: () => void;
    
}

const Modal: React.FC<ModalProps> = ({
    variant,
    open,
    onClose,
}) => {
    if (!open) return null;

    return(
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
        <div className="flex flex-col p-6 bg-neutral-50" onClick={onClose}>

        <button onClick={onClose}>
            Cancel
        </button>
        </div>
        </div>

    )
}

export default Modal;