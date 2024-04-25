import React from "react";

const TicketPopup = ({ ticket, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative">
        <button className="absolute top-2 right-2 px-3 py-1 bg-gray-800 text-white rounded-md" onClick={onClose}>X</button>
        <div className="mb-4">
          <p className="mb-1"><span className="font-bold">Ticket ID:</span> {ticket.ticket_id}</p>
          <p className="mb-1"><span className="font-bold">Project:</span> {ticket.project_name}</p>
          <p className="mb-1"><span className="font-bold">Module:</span> {ticket.module_name}</p>
          <p className="mb-1"><span className="font-bold">Category:</span> {ticket.category}</p>
          <p className="mb-1"><span className="font-bold">Raised Time:</span> {new Date(ticket.raised_time).toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Approve</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
