import React from "react";
import Modal from "../modal";
import { ModalDeleteIcon } from "../../../assets";
import Button from "../button";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  highlightText,
}) {
  return (
    <Modal isOpen={isOpen}>
      <div className="delete-modal">
        <img src={ModalDeleteIcon} alt="modal-delete-icon" />
        <p>
          Apakah anda yakin menghapus activity{" "}
          <span className="text-bold">{highlightText}</span>
        </p>
        <div className="delete-modal__footer">
          <Button
            dataCy="modal-delete-cancel-button"
            textColor="#4A4A4A"
            backgroundColor="#F4F4F4"
            backgroundColorHover="#d9d9d9"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            dataCy="modal-delete-confirm-button"
            backgroundColor="#ED4C5C"
            backgroundColorHover="#a43944"
            onClick={onDelete}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
}
