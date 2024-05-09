import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import TicketPopup from "./TicketPopup";

const DashboardTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [popupTicket, setPopupTicket] = useState(null);

  const handleTakeActionClick = (ticket) => {
    setPopupTicket(ticket);
  };

  useEffect(() => {
    async function fetchData() {
      const loggedInEmpId = sessionStorage.getItem("emp_id");

      if (loggedInEmpId) {
        const res = await axios.get(`http://localhost:5000/it_tickets_status/${loggedInEmpId}`);
        const Data = await res.data;
        setData(Data);
        setFilterData(Data);
      }
    }

    fetchData();
  }, []);

  const debouncedFilterData = _.debounce((searchTerm) => {
    setFilterData(
      data.filter(
        (item) =>
          item.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.support_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase()) // Add status filtering
      )
    );
    setCurrentPage(1);
  }, 500);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } font-bold py-1 px-3 rounded transition duration-300 ease-in-out`}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const firstPageNumbers = [];
      const lastPageNumbers = [];

      for (let i = 1; i <= maxVisiblePages; i++) {
        firstPageNumbers.push(
          <button
            key={i}
            className={`${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } font-bold py-1 px-3 rounded transition duration-300 ease-in-out`}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }

      const ellipsis = <span key="ellipsis">...</span>;

      for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
        lastPageNumbers.push(
          <button
            key={i}
            className={`${
              currentPage === i
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } font-bold py-1 px-3 rounded transition duration-300 ease-in-out`}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }

      pageNumbers.push(...firstPageNumbers, ellipsis, ...lastPageNumbers);
    }

    return pageNumbers;
  };

  // Calculate range of entries being shown
  const entriesStart = indexOfFirstItem + 1;
  const entriesEnd = Math.min(indexOfLastItem, filterData.length);
  const totalEntries = filterData.length;

  return (
    <div className="container max-w-full px-4 py-8">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedFilterData(e.target.value);
          }}
        />
      </div>
      <div className="overflow-x-auto rounded-lg shadow-xl">
        <table className="w-full table-auto border-collapse border border-gray-300 ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Ticket ID</th>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Module</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Issue Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Support Person</th>
              <th className="px-4 py-2 text-left">Contact No.</th>
              <th className="px-4 py-2 text-left">Raised Time</th>
              <th className="px-4 py-2 text-left">Take Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="px-4 py-2">{item.ticket_id}</td>
                <td className="px-4 py-2">{item.project_name}</td>
                <td className="px-4 py-2">{item.module_name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.issue_title}</td>
                <td className="px-4 py-2">{item.ticket_status || "Unclaimed"}</td>
                <td className="px-4 py-2">{item.support_person || "N/A"}</td>
                <td className="px-4 py-2">{item.contact}</td>
                <td className="px-4 py-2">
                  {new Date(item.raised_time).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="px-4 py-2">
                  <div>
                    <button
                      className="px-2 py-2 bg-gray-800 hover:bg-gray-950 text-white font-semibold rounded-md"
                      onClick={() => handleTakeActionClick(item)}
                    >
                      Take Action
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {entriesStart} to {entriesEnd} of {totalEntries} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`${
              currentPage === 1
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            className={`${
              currentPage === totalPages
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            } font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </div>

      {popupTicket && (
        <TicketPopup
          ticket={popupTicket}
          onClose={() => setPopupTicket(null)}
        />
      )}
    </div>
  );
};

export default DashboardTable;
