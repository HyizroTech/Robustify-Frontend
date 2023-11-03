import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal, modalContent, isOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};
