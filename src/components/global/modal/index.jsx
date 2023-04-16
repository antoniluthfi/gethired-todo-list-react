import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, children }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(isOpen);
    } else {
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return createPortal(
    <div className={`modal-overlay ${isOpen ? "modal-overlay-open" : ""}`}>
      <div className={`custom-modal ${isOpen ? "modal-open" : "modal-hide"}`}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
