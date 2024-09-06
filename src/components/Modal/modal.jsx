import ReactDOM from "react-dom";

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal overflow-y-auto show mt-0 ml-0 pl-0 z-10000 flex items-center" tabIndex={-1} aria-hidden="false" style={{ zIndex: "10000"}}>
            <div className="modal-dialog modal-parent-div">
                <div className="modal-content">
                    <div className="modal-body p-0">{children}</div>
                </div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Modal;
