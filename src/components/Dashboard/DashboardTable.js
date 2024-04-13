import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/Data/data.json");
      const jsonData = await res.data;
      console.log(jsonData);
      setData(jsonData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end pr-3 pt-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                {/* <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Raiser</th>
                <th className="px-4 py-2 border border-gray-300">Location</th> */}
                <th className="px-4 py-2 border border-gray-300">
                  Contact No.
                </th>
                {/* <th className="px-4 py-2 border border-gray-300">
                  Support Persons
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Elapsed Time
                </th> */}
                <th className="px-4 py-2 border border-gray-300">
                  Raised Time
                </th>
                {/* <th className="px-4 py-2 border border-gray-300">
                  Solution Time
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Consume Time(minutes)
                </th> */}
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.id}
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
                    {item.issueTitle}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {item.status}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.raiser}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.location}
                  </td> */}
                  <td className="px-4 py-2 border border-gray-300">
                    {item.contact}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {item.supportPersons}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.elapsedTime}
                  </td> */}
                  <td className="px-4 py-2 border border-gray-300">
                    {item.raisedTime}
                  </td>
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {item.solutionTime}
                  </td> */}
                  {/* <td className="px-4 py-2 border border-gray-300">
                    {item.consumeTime}
                  </td> */}
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
        <button className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded">
          Previous
        </button>
        <button className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardTable;
