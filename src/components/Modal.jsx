// Modal.js
import React from 'react';

export default function Modal({ transaction, setModalOpen }) {
  const handleClose = () => setModalOpen(false);  // Close modal

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-black">Update Transaction</h3>
        <div>
          {/* Render transaction details in the modal */}
          <p className=' text-black'><strong>Category:</strong> {transaction?.category}</p>
          <p className=' text-black'><strong>Amount:</strong> ${transaction?.amount}</p>
          <p className=' text-black'><strong>Description:</strong> {transaction?.description}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black">Close</button>
        </div>
      </div>
    </div>
  );
}
