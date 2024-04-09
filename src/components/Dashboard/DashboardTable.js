import React from 'react';

const DashboardTable = () => {

  const dummyData = [
    {
      ticketNo: 'T001',
      project: 'Project A',
      module: 'Module 1',
      category: 'Category A',
      issueTitle: 'Issue 1',
      status: 'Open',
      raiser: 'John Doe',
      location: 'Location A',
      contactNo: '1234567890',
      supportPersons: 'Support Person 1',
      elapsedTime: '2 hours',
      raisedTime: '2024-04-09 10:00',
      solutionTime: '2024-04-09 12:00',
      consumeTime: '120',
    },
    {
      ticketNo: 'T002',
      project: 'Project B',
      module: 'Module 2',
      category: 'Category B',
      issueTitle: 'Issue 2',
      status: 'Closed',
      raiser: 'Jane Doe',
      location: 'Location B',
      contactNo: '0987654321',
      supportPersons: 'Support Person 2',
      elapsedTime: '1 day',
      raisedTime: '2024-04-08 09:00',
      solutionTime: '2024-04-09 09:00',
      consumeTime: '1440',
    },
   
  ];
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
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">{data.ticketNo}</td>
                <td className="px-4 py-2 border border-gray-300">{data.project}</td>
                <td className="px-4 py-2 border border-gray-300">{data.module}</td>
                <td className="px-4 py-2 border border-gray-300">{data.category}</td>
                <td className="px-4 py-2 border border-gray-300">{data.issueTitle}</td>
                <td className="px-4 py-2 border border-gray-300">{data.status}</td>
                <td className="px-4 py-2 border border-gray-300">{data.raiser}</td>
                <td className="px-4 py-2 border border-gray-300">{data.location}</td>
                <td className="px-4 py-2 border border-gray-300">{data.contactNo}</td>
                <td className="px-4 py-2 border border-gray-300">{data.supportPersons}</td>
                <td className="px-4 py-2 border border-gray-300">{data.elapsedTime}</td>
                <td className="px-4 py-2 border border-gray-300">{data.raisedTime}</td>
                <td className="px-4 py-2 border border-gray-300">{data.solutionTime}</td>
                <td className="px-4 py-2 border border-gray-300">{data.consumeTime}</td>
                <td className="px-4 py-2 border border-gray-300">Action Button</td>
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
}

export default DashboardTable;
