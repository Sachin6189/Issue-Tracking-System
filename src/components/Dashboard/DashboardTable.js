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
      const sortedData = jsonData.sort(
        (a, b) => new Date(b.raisedTime) - new Date(a.raisedTime)
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

  return (
    <div>
      <div className="flex justify-end pr-3 pt-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none font-[fangsong] focus:ring focus:border-blue-500"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedFilterData(e.target.value);
          }}
        />
      </div>
      <div className="px-3">
        <div className="overflow-x-auto text-sm font-[fangsong] pt-5 rounded">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300">Ticket No.</th>
                <th className="px-4 py-2 border border-gray-300">Project</th>
                <th className="px-4 py-2 border border-gray-300">Module</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">
                  Issue Title
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Contact No.
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Raised Time
                </th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">
                    <span
                      className="hover:text-blue-700 hover:underline cursor-pointer"
                      onClick={() => handleIssueClick(item)}
                    >
                      {item.id}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.selectedProject.value}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.selectedModule.value}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.selectedCategory.value}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <span
                      className="hover:text-blue-700 hover:underline cursor-pointer"
                      onClick={() => handleIssueClick(item)}
                    >
                      {item.issueTitle}
                    </span>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.contact}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.raisedTime}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    Action Button
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between px-3 py-4">
        <button
          className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= filterData.length}
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
