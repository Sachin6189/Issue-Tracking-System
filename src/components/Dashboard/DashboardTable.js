import React from 'react';

const DashboardTable = () => {
  return (
    <div>
      <div className="flex justify-end pr-3 pt-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className='px-3'>
      <div className="overflow-x-auto text-sm font-[fangsong] pt-5 rounded">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Ticket No.</th>
              <th className="px-4 py-2 border border-gray-300">Project</th>
              <th className="px-4 py-2 border border-gray-300">Module</th>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Issue Title</th>
              <th className="px-4 py-2 border border-gray-300">Status</th>
              <th className="px-4 py-2 border border-gray-300">Raiser</th>
              <th className="px-4 py-2 border border-gray-300">Location</th>
              <th className="px-4 py-2 border border-gray-300">Contact No.</th>
              <th className="px-4 py-2 border border-gray-300">Support Persons</th>
              <th className="px-4 py-2 border border-gray-300">Elapsed Time</th>
              <th className="px-4 py-2 border border-gray-300">Raised Time</th>
              <th className="px-4 py-2 border border-gray-300">Solution Time</th>
              <th className="px-4 py-2 border border-gray-300">Consume Time(minutes)</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Populate table rows here "Table data will come dynamically" */}
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
}

export default DashboardTable;
