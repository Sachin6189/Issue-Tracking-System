import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Tickets from "../../components/assets/tickets.gif";
import TicketOpen from "../../components/assets/open_tickets.gif";
import Pending from "../../components/assets/pending.gif";
import Unclaimed from "../../components/assets/unclaimed.gif";
import Resolved from "../../components/assets/resolved.gif";
import Arrow from "../../components/assets/arrow-right.png";
import axios from "axios";
import DashboardTable from "./DashboardTable";

const Main = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tickets, setTickets] = useState([]);
  const [noOfTicketsRaised, setNoOfTicketsRaised] = useState(0);
  const [rejectedTickets, setRejectedTickets] = useState(0);
  const [ticketsPending, setTicketsPending] = useState(0);
  const [unclaimedTickets, setUnclaimedTickets] = useState(0);
  const [ticketsResolved, setTicketsResolved] = useState(0);
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  const handleChangeStart = (date) => {
    setStartDate(date);
  };

  const handleChangeEnd = (date) => {
    setEndDate(date);
  };

  const raiseTicket = () => {
    navigate("/dashboard/raiseTicket");
  };

  const empID = sessionStorage.getItem("emp_id");

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:5000/it_tickets_status/${empID}`
      );
      const jsonData = await res.data;
      setTickets(jsonData);

      // Filter tickets based on their status
      const raisedTickets = jsonData.length;
      const rejectedTickets = jsonData.filter(
        (ticket) => ticket.ticket_status === "Rejected"
      ).length;
      const pendingTickets = jsonData.filter(
        (ticket) => ticket.ticket_status === "Open"
      ).length;
      console.log(jsonData);
      const unclaimedTickets = jsonData.filter(
        (ticket) => !ticket.ticket_status
      ).length;
      const resolvedTickets = jsonData.filter(
        (ticket) => ticket.ticket_status === "Closed"
      ).length;

      setNoOfTicketsRaised(raisedTickets);
      setRejectedTickets(rejectedTickets);
      setTicketsPending(pendingTickets);
      setUnclaimedTickets(unclaimedTickets);
      setTicketsResolved(resolvedTickets);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/*Button and Calendar */}
      <div className="flex justify-between items-center mt-5 pl-2">
        <button
          onClick={raiseTicket}
          className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded"
        >
          Raise New Ticket
        </button>
        <div className="flex font-[fangsong] pr-3">
          <div className="mr-3 ">
            <DatePicker
              selected={startDate}
              onChange={handleChangeStart}
              dateFormat="MMMM d, yyyy"
              className="px-3 py-1 border border-gray-400 rounded-md focus:outline-none  focus:border-blue-500"
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onChange={handleChangeEnd}
              dateFormat="MMMM d, yyyy"
              className="px-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/*Boxes design*/}
      <div className="flex pt-5">
        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-red-400 rounded-lg font-semibold text-red-400 font-[fangsong] border-gr">
          <div className="w-1/4">
            <img src={Tickets} alt="" />
          </div>
          <div className="pl-10 ">
            <div>Ticket Raised</div>
            <div className="text-3xl">{noOfTicketsRaised}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => setFilterStatus("")}
            >
              Show Tickets Raised By Me{" "}
              <img className="pl-1 h-4 w-4" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className=" flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-indigo-500 rounded-lg font-semibold text-indigo-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={TicketOpen} alt="" />
          </div>
          <div className="pl-10">
            <div>Rejected Tickets</div>
            <div className="text-3xl">{rejectedTickets}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => setFilterStatus("Rejected")}
            >
              Show Rejected Tickets{" "}
              <img className="pl-1 h-4 w-4" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-yellow-400 rounded-lg font-semibold text-yellow-500 font-[fangsong]">
          <div className="w-1/4 ">
            <img src={Pending} alt="" />
          </div>
          <div className="pl-10">
            <div>Tickets Pending</div>
            <div className="text-3xl">{ticketsPending}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => setFilterStatus("Pending")}
            >
              Show Pending Tickets{" "}
              <img className="h-4 w-4 pl-1" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-purple-500 rounded-lg font-semibold text-purple-500 font-[fangsong] ">
          <div className="w-1/4">
            <img src={Unclaimed} alt="" />
          </div>
          <div className="pl-9">
            <div>Unclaimed Tickets</div>
            <div className="text-3xl">{unclaimedTickets}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => setFilterStatus("Unclaimed")}
            >
              Show Unclaimed Tickets{" "}
              <img className="h-4 w-4 pl-1" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-green-500 rounded-lg font-semibold text-green-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={Resolved} alt="" />
          </div>
          <div className="pl-10">
            <div>Tickets Resolved</div>
            <div className="text-3xl">{ticketsResolved}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => setFilterStatus("Resolved")}
            >
              Show Tickets Resolved{" "}
              <img className="h-4 w-4 pl-1" src={Arrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      <DashboardTable tickets={tickets} filteredStatus={filterStatus} />
    </div>
  );
};

export default Main;
