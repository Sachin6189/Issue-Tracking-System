import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import ReplyTicket from "./ReplyTicket";

const DashboardTable = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/Data/data.json");
      const jsonData = await res.data;

      const convertRaisedTime = (raisedTime) => {
        const [date, time] = raisedTime.split(" ");
        const [day, month, year] = date.split("-");
        const [hours, minutes] = time.split(":");
        const amPm = time.includes("PM") ? "PM" : "AM";

        const hours12 =
          amPm === "PM" && hours < 12 ? parseInt(hours, 10) + 12 : hours;

        return `${year}-${month}-${day}T${hours12}:${minutes}:00`;
      };

      const sortedData = jsonData
        .slice()
        .sort(
          (a, b) =>
            new Date(convertRaisedTime(b.raisedTime)) -
            new Date(convertRaisedTime(a.raisedTime))
        );

      setData(sortedData);
      setFilterData(sortedData);
    }

    fetchData();
  }, []);

  const debouncedFilterData = _.debounce((searchTerm) => {
    setFilterData(
      data.filter(
        (item) =>
          item.selectedProject.value
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.selectedModule.value
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.selectedCategory.value
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.issueTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.contact.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, 500);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

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
              <th className="px-4 py-2 text-left">Ticket No.</th>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Module</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Issue Title</th>
              <th className="px-4 py-2 text-left">Contact No.</th>
              <th className="px-4 py-2 text-left">Raised Time</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td
                  className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleIssueClick(item)}
                >
                  {item.id}
                </td>
                <td className="px-4 py-2">{item.selectedProject.value}</td>
                <td className="px-4 py-2">{item.selectedModule.value}</td>
                <td className="px-4 py-2">{item.selectedCategory.value}</td>
                <td
                  className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleIssueClick(item)}
                >
                  {item.issueTitle}
                </td>
                <td className="px-4 py-2">{item.contact}</td>
                <td className="px-4 py-2">{item.raisedTime}</td>
                <td className="px-4 py-2">Action Button</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
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
        <span className="text-gray-800 font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
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

      {selectedIssue && (
        <ReplyTicket
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
};

export default DashboardTable;
