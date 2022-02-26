import React, { useState, useContext } from "react";

import AddPaymentModal from "../components/Modals/AddPaymentModal";

const ModalsContext = React.createContext();

// if imported, this function gives access to all of ModalsContext
// This is the context consumer ?
// (CLUE: gives access to paymentsDetails variable below)
export function useModals() {
  return useContext(ModalsContext);
}

export function ModalsProvider({ children }) {
  // const [loading, setLoading] = useState(false);
  const [isAddPaymentModalOpen, setAddPaymentModalOpen] = useState(false);

  let modalsDetails = {
    isAddPaymentModalOpen,
    setAddPaymentModalOpen,
  };

  return (
    <ModalsContext.Provider value={modalsDetails}>
      <AddPaymentModal
        isOpen={isAddPaymentModalOpen}
        setOpen={setAddPaymentModalOpen}
      />
      {children}
    </ModalsContext.Provider>
  );
}
