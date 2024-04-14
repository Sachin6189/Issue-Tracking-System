import React, { useState } from "react";
import popupbg from "../assets/bg1.jpg";

const ReplyTicket = ({ issue, onClose }) => {
  const [imageData, setImageData] = useState("");

  const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bsdr = atob(arr[1]),
      n = bsdr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bsdr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const createObjectURL = (blob) => {
    return URL.createObjectURL(blob);
  };

  setImageData(imageData);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center font-[fangsong] text-xl bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full lg:w-3/4 md:w-5/6 border-2 border-gray-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Ticket Number: {issue.id}
          </h2>
          <button
            className="px-2 py-1 text-xl text-gray-900 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Issue Title:
            </h3>
            <p className="text-gray-800">{issue.issueTitle}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Project:
            </h3>
            <p className="text-gray-800">{issue.selectedProject.value}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Module:
            </h3>
            <p className="text-gray-800">{issue.selectedModule.value}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Category:
            </h3>
            <p className="text-gray-800">{issue.selectedCategory.value}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Raised Time:
            </h3>
            <p className="text-gray-800">{issue.raisedTime}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description:
            </h3>
            <p className="text-gray-800">{issue.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">File:</h3>
            {imageData && (
              <img
                src={createObjectURL(dataURLtoFile(imageData, "image.png"))}
              />
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-[#47c8c3] font-semibold rounded-md shadow-md transition-colors duration-300">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyTicket;
