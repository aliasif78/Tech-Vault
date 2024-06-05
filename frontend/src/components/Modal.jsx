const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-80"></div>
                    <div className="absolute top-[30%] right-[40%] bg-neutral-800 p-4 rounded-lg z-10 text-right">
                        <button className="text-white font-semibold hover:text-neutral-300 focus:outline-none mr-2" onClick={onClose}>X</button>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal