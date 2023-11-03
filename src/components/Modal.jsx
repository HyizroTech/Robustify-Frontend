import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useModal } from "../contexts";

const Modal = () => {
  const { hideModal, modalContent, isOpen } = useModal();

  return (
    <Dialog open={isOpen} onClose={hideModal}>
      <DialogContent>{modalContent}</DialogContent>
    </Dialog>
  );
};

export default Modal;
