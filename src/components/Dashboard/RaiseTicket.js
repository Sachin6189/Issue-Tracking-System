import React, { useEffect, useState } from "react";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const RaiseTicket = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contact, setContact] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submit", {
        selectedEmployee,
        selectedProject,
        selectedModule,
        selectedCategory,
        contact,
        issueTitle,
      });
      alert("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again later.");
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "290px",
    }),
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const fetchEmployees = async () => {
    const response = await axios.get("/Data/employee.json");
    setEmployees(response.data.employeeDetails);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get("/Data/projects.json");
    setProjects(response.data.projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const filtered = projects.find(
        (project) => project.projectName === selectedProject.label
      );
      setFilteredModules(filtered.modules);
      setSelectedModule(null); 
      setSelectedCategory(null); 
    } else {
      setFilteredModules([]);
      setSelectedModule(null); 
      setSelectedCategory(null); 
    }
  }, [selectedProject, projects]);

  useEffect(() => {
    if (selectedModule) {
      const filtered = filteredModules.find(
        (module) => module.moduleName === selectedModule.label
      );
      setFilteredCategories(filtered.categories);
      setSelectedCategory(null);
    } else {
      setFilteredCategories([]);
      setSelectedCategory(null); 
    }
  }, [selectedModule, filteredModules]);

  const debouncedOnChange = _.debounce((event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
  }, 500);

  return (
    <div className="flex flex-col min-h-screen font-[fangsong]">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex">
        {showSidebar && <Sidebar />}
        <div className="flex-grow bg-gray-100 p-4 flex flex-col">
          <div className="box flex-grow overflow-y-auto">
            <h1 className="text-blue-500 font-semibold text-3xl text-center mb-4">
              Create a New Ticket
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full sm:w-auto mb-4 p- sm:mb-0">
                <label htmlFor="behalf" className="block mb-1">
                  On Behalf:
                </label>
                <Select
                  value={selectedEmployee}
                  onChange={setSelectedEmployee}
                  options={employees.map((employee) => ({
                    value: employee.empID,
                    label: employee.empID,
                  }))}
                  placeholder="--Select an employee--"
                  styles={customStyles}
                />
              </div>
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label htmlFor="project" className="block mb-1">
                  Project:
                </label>
                <Select
                  value={selectedProject}
                  onChange={setSelectedProject}
                  options={projects.map((projects) => ({
                    value: projects.projectName,
                    label: projects.projectName,
                  }))}
                  placeholder="--Select a project--"
                  styles={customStyles}
                />
              </div>
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label htmlFor="module" className="block mb-1">
                  Module:
                </label>
                <Select
                  value={selectedModule}
                  onChange={setSelectedModule}
                  options={filteredModules.map((modules) => ({
                    value: modules.moduleName,
                    label: modules.moduleName,
                  }))}
                  placeholder="--Select a module--"
                  styles={customStyles}
                />
              </div>
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label htmlFor="category" className="block mb-1">
                  Category:
                </label>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={filteredCategories.map((categories) => ({
                    value: categories,
                    label: categories,
                  }))}
                  placeholder="--Select a category--"
                  styles={customStyles}
                />
              </div>
              <div className="w-full px-1 mb-4 sm:mb-0">
                <label htmlFor="contact" className="block mb-1">
                  Contact:
                </label>
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter Contact Number"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="w-full mb-4 px-1 sm:mb-0">
                <label htmlFor="issueTitle" className="block mb-1">
                  Issue Title:
                </label>
                <input
                  type="text"
                  id="issueTitle"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="Enter Issue Title"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="w-full mt-2 mb-1">
                <label htmlFor="description" className="block mb-1">
                  Description:
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={debouncedOnChange}
                />
              </div>
              <div className="w-full mt-1 mb-1">
                <label htmlFor="uploadFile" className="block mb-1">
                  Upload File:
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-center mt-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 mr-4 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-6 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 w-full bg-gray-200 border-t border-gray-300 flex justify-between items-center px-4 py-2">
        <div className="text-sm">
          <div className="font-[fangsong]">
            Copyright &copy; 2024{" "}
            <a
              href="https://www.tatamotors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Tata Motors Limited.
            </a>{" "}
            All Rights Reserved.
            <p className="text-xs">Use Chrome OR Firefox for a better view.</p>
          </div>
        </div>
        <div className="text-sm font-[fangsong]">Version 2.0</div>
      </div>
    </div>
  );
};

export default RaiseTicket;
