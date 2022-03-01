import React, { useState, useContext } from "react";

import AddPaymentModal from "../components/Modals/AddPaymentModal";
import EditPaymentModal from "../components/Modals/EditPaymentModal";
import PaymentDetailsModal from "../components/PaymentDetailsModal";

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

  const [viewingPayment, setViewingPayment] = useState({ id: null });
  const [editingPayment, setEditingPayment] = useState({ id: null });

  let modalsDetails = {
    isAddPaymentModalOpen,
    setAddPaymentModalOpen,

    viewingPayment,
    setViewingPayment,

    editingPayment,
    setEditingPayment,
  };

  return (
    <ModalsContext.Provider value={modalsDetails}>
      {isAddPaymentModalOpen && (
        <AddPaymentModal
          isOpen={isAddPaymentModalOpen}
          setOpen={setAddPaymentModalOpen}
        />
      )}
      {viewingPayment.id && !editingPayment.id && (
        <PaymentDetailsModal
          isOpen={viewingPayment.id}
          setOpen={() => setViewingPayment({ id: null })}
          payment={viewingPayment}
        ></PaymentDetailsModal>
      )}
      {editingPayment.id && (
        <EditPaymentModal
          payment={editingPayment}
          isOpen={editingPayment.id}
          setOpen={() => setEditingPayment({ id: null })}
        />
      )}
      {children}
    </ModalsContext.Provider>
  );
}
