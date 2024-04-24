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


const Main = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tickets, setTickets] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/Data/data.json");
      const jsonData = await res.data;
      setTickets(jsonData);
    }
    fetchData();
  }, []);

  const NoOfTicketsRaised = tickets.length;
  const OpenTickets = 0;
  const TicketsPending = 0;
  const UnclaimedTickets = tickets.length;
  const TicketsResolvedByMyself = 0;

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
            <div className="text-3xl">{NoOfTicketsRaised}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="pl-1 h-4 w-4" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className=" flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-indigo-500 rounded-lg font-semibold text-indigo-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={TicketOpen} alt="" />
          </div>
          <div className="pl-10">
            <div>Open Tickets</div>
            <div className="text-3xl">{OpenTickets}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="pl-1 h-4 w-4" src={Arrow} alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-yellow-400 rounded-lg font-semibold text-yellow-500 font-[fangsong]">
          <div className="w-1/4 ">
            <img src={Pending} alt="" />
          </div>
          <div className="pl-10">
            <div>Tickets Pending</div>
            <div className="text-3xl">{TicketsPending}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={Arrow} alt=""/>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-purple-500 rounded-lg font-semibold text-purple-500 font-[fangsong] ">
          <div className="w-1/4">
            <img src={Unclaimed} alt=""/>
          </div>
          <div className="pl-9">
            <div>Unclaimed Tickets</div>
            <div className="text-3xl">{UnclaimedTickets}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={Arrow} alt=""/>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 m-2 w-full h-24 border-l-8 border-green-500 rounded-lg font-semibold text-green-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={Resolved} alt=""/>
          </div>
          <div className="pl-10">
            <div>Tickets Resolved</div>
            <div className="text-3xl">{TicketsResolvedByMyself}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={Arrow} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
