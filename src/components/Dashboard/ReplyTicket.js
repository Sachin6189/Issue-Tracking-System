import React, { useEffect, useState } from "react";
import axios from "axios";
import close from "../../components/assets/close.gif";
import downloadImg from "../../components/assets/downloadImg.gif";
import userlogo from "../../components/assets/flaticon3.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
import Select from "react-select";

const ReplyTicket = ({ issue, onClose }) => {
  const [imageData, setImageData] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("Open");
  const [ccList, setCcList] = useState("");
  const [solutionTime, setSolutionTime] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const [approvalRequired, setApprovalRequired] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const username = "Sachin Kumar";
  const EmpID = "928810";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Add more options as needed
  ];

  useEffect(() => {
    if (issue.imageData) {
      setImageData(issue.imageData);
    }
  }, [issue.imageData]);

  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = imageData;
    anchor.download = "image.jpg";
    anchor.click();
  };

  const handleReplyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSave = async () => {
    try {
      if (!description) {
        throw new Error(
          "solution is mandatory fields."
        );
      }

      const replyData = {
        ticketStatus,
        ccList,
        solutionTime,
        department,
        description,
        imageData,
        approvalRequired,
        selectedOption: selectedOption ? selectedOption.value : null,
      };

      const res = await axios.post("http://localhost:5000/reply", replyData);
      alert(res.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending data:", error);
      alert(error.message);
    }
  };

  const debouncedOnChange = _.debounce((event, editor) => {
    const data = editor.getData();
    setDescription(data);
  }, 500);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleApprovalChange = (event) => {
    setApprovalRequired(event.target.checked);
    if (!event.target.checked) {
      setSelectedOption(null);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-full w-full lg:w-3/4 md:w-5/6 border-2 border-gray-500">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ticket Number: {issue.id}</h2>
          <button
            className="px-2 py-1 rounded-full hover:bg-red-500 transition-colors duration-500 h-10 w-10"
            onClick={onClose}
          >
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Issue Title:{" "}
              <span className="text-gray-600">{issue.issueTitle}</span>
            </h3>
            <p className="text-gray-600 text-base mb-2">
              Project: {issue.selectedProject.value}
            </p>
            <p className="text-gray-600 text-base mb-2">
              Module: {issue.selectedModule.value}
            </p>
            <p className="text-gray-600 text-base">
              Category: {issue.selectedCategory.value}
            </p>
          </div>
          <div>
            <div>
              <div className="mt-2 bg-red-500 w-48 pl-2 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {issue.raisedTime}
                </h4>
              </div>
              <div className="flex gap-3 py-4 items-center">
                <img src={userlogo} alt="" className="h-10 w-10 rounded-full" />
                <span className="text-xl font-semibold text-gray-800 gap-5">
                  {username} <span className="font-medium">{EmpID}</span>
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                  Description:
                </h3>
                <p
                  className="text-gray-600 font-sans"
                  dangerouslySetInnerHTML={{ __html: issue.description }}
                ></p>
              </div>
              <div className="flex items-center mt-4">
                {imageData && (
                  <h3 className="text-lg font-semibold text-gray-800 mr-2">
                    File:
                  </h3>
                )}
                {imageData && (
                  <button
                    className="px-2 py-2 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
                    onClick={handleDownload}
                  >
                    <img src={downloadImg} alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="px-6 bg-gray-100 py-4 flex justify-end">
            <button
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded ${
                showForm ? "hidden" : ""
              }`}
              onClick={handleReplyClick}
            >
              Reply
            </button>
          </div>
        </div>
        <div>

          
          {showForm && (
            <div className="bg-gray-100 shadow-xl rounded-md border my-6 mx-6">
              <div className="p-6 flex flex-wrap">
                <div className="mb-4 flex-1 mr-4">
                  <label
                    htmlFor="ticketStatus"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    Ticket Status:
                  </label>
                  <select
                    id="ticketStatus"
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                    className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Closed">Rejected</option>
                    <option value="Closed">Re-Opened</option>
                  </select>
                </div>
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="ccList"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    CC List:
                  </label>
                  <input
                    type="text"
                    id="ccList"
                    value={ccList}
                    onChange={(e) => setCcList(e.target.value)}
                    className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="w-full"></div>
                <div className="mb-4 flex-1 mr-4">
                  <label
                    htmlFor="solutionTime"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    Solution Time:
                  </label>
                  <input
                    type="text"
                    id="solutionTime"
                    value={solutionTime}
                    onChange={(e) => setSolutionTime(e.target.value)}
                    className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="department"
                    className="flex text-sm font-medium text-gray-700"
                  >
                    Tag Issue Type:
                  </label>
                  <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Support">Support</option>
                    <option value="HR">Bug</option>
                    <option value="IT">Data Dump</option>
                    <option value="IT">User Doubt</option>
                  </select>
                </div>
                <div className="mb-4 w-full flex items-center">
                  <label
                    htmlFor="approvalRequired"
                    className="block text-sm font-medium text-gray-700 mr-2"
                  >
                    Approval Required:
                  </label>
                  <input
                    type="checkbox"
                    id="approvalRequired"
                    checked={approvalRequired}
                    onChange={handleApprovalChange}
                    className="mt-1 form-checkbox h-5 w-5 text-indigo-600"
                  />
                </div>
                <div className="mb-4 w-full">
                  <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleOptionChange}
                    isClearable
                    isSearchable
                    isDisabled={!approvalRequired}
                    placeholder = "...Select Employee Name..."
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        "&:hover": {
                          border: "1px solid #a0aec0",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#6366f1" : "white",
                        color: state.isSelected ? "white" : "#4b5563",
                        "&:hover": {
                          backgroundColor: "#e0e7ff",
                          color: "#1e293b",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Solution<span className="text-red-500">*</span>:
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={debouncedOnChange}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="uploadFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload File:
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    onChange={handleImageChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between w-full">
                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md"
                    onClick={handleCloseForm}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyTicket;
