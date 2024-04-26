import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TicketPopup = ({ ticket, onClose }) => {
  const [description, setDescription] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="bg-white p-8 rounded-lg relative w-full max-w-3xl h-auto max-h-screen overflow-y-auto">
        <div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">Ticket ID:</span> {ticket.ticket_id}
            </div>
            <button
              className="px-3 py-1 bg-gray-800 text-white rounded-md"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
          <p className="font-bold">
            Issue Title:<span>{ticket.issue_title}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Project:</span> {ticket.project_name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Module:</span> {ticket.module_name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Category:</span> {ticket.category}
          </p>
          <p className="mb-0">
            {new Date(ticket.raised_time).toLocaleString("en-IN", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        <div className="mb-6 w-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Remarks:
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
            className="bg-white"
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-green-500 text-white rounded-md mr-4">
            Approve
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-md">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
