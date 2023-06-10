import React, { useState, useEffect } from "react";
import { Button } from "../utils/ToolUtils";
import {
  Modal,
  fetchClassesWithFiles,
  handleNewClass,
  handleFileUploadDashboard,
  handleLogout,
  handleGenerate,
} from "../utils/DashboardUtils";
import { ClipLoader } from "react-spinners";
import { FaPlusCircle, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClass, setNewClass] = useState("");
  const [file, setFile] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [uploadedLoading, setUploadedLoading] = useState(false);
  const [isOpenClass, setIsOpenClass] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const [generated, setGenerated] = useState({});
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    fetchClassesWithFiles(setClasses, setSelectedClass);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-6 sm:px-8 lg:px-10">
      <Modal isOpen={isOpenClass} setIsOpen={setIsOpenClass}>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-5 text-center">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-2 text-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
                Add a new class
              </h1>
              <p className="text-gray-500">
                Enter the name of your class below.
              </p>
            </div>
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder="New Class"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-3 p-3"
            />
            <Button
              onClick={() => {
                handleNewClass(
                  setNewClass,
                  newClass,
                  setClasses,
                  setSelectedClass
                );
                setIsOpenClass(false);
              }}
            >
              Create Class
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isOpenFile} setIsOpen={setIsOpenFile}>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-5 text-center">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-2 text-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
                Upload a new file
              </h1>
              <p className="text-gray-500">
                Choose a class and upload your homework or textbook PDF file.
              </p>
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-3 p-3"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="bg-white flex justify-center text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
              {file ? file.name : "Choose File"}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {pdfSrc && (
              <>
                <Button
                  onClick={() =>{
                    handleFileUploadDashboard(
                      setUploadedLoading,
                      file,
                      selectedClass,
                      setClasses,
                      setSelectedClass
                    )
                    setIsOpenFile(false)
                  }
                  }
                  className="mt-4 py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
                >
                  {uploadedLoading && (
                    <ClipLoader
                      className="mr-1"
                      size={25}
                      color={"#ffffff"}
                      loading={true}
                    />
                  )}
                  Upload File
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
      <h1 className="text-5xl font-bold mb-10 text-gray-900 bg-clip-text  ">
        Welcome to the center of your
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {" "}
          AI study tool!
        </span>
      </h1>

      <div className="flex flex-col w-full space-y-6">
        <div className="grid gap-4 grid-cols-3">
          {classes.map((item, index) => (
            <div
              key={index}
              className="p-5 min-h-[25vh] bg-white rounded-lg shadow-lg "
            >
              <h2 className="text-3xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
                {item.name}
              </h2>
              <div className="space-y-3">
                {item.files &&
                Array.isArray(item.files) &&
                item.files.length > 0 ? (
                  item.files.map((file, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3 p-2 bg-gray-50 rounded-lg relative hover:bg-gray-100"
                    >
                      <div className="mr-2">
                        <FaFilePdf className="text-red-500" />
                      </div>
                      <div className="flex-grow">
                        <a
                          href={file.file_url}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          {file.file_name}
                        </a>
                      </div>
                      <div className=" text-sm absolute right-0 mr-4 opacity-0 group-hover:opacity-100 transition duration-200">
                        <button
                          // onClick={() => startChat(file.file_id)}
                          className="px-2 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        >
                          Chat with Study Bot
                        </button>
                        {loading[file.file_id] ? (
                          <ClipLoader
                            className="mr-1"
                            size={25}
                            color={"#ffffff"}
                            loading={true}
                          />
                        ) : file.study_notes_created ? (
                          <button
                            // href={/* link to download the study notes */}
                            className="px-2 py-1 ml-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                          >
                            Download Study Notes
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleGenerate(
                                file.hashed_file_name,
                                file.file_id,
                                setGenerated,
                                setLoading
                              )
                            }
                            className="px-2 py-1 ml-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                          >
                            Generate Study Notes
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No files uploaded yet</p>
                )}
                <div
                  onClick={() => setIsOpenFile(true)}
                  className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                >
                  <FaPlusCircle className="text-md text-green-500 mr-2" />

                  <p className="text-gray-500">Add a new file</p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-5 min-h-[25vh] bg-white rounded-lg shadow-lg flex flex-col items-center place-content-center">
            <p className="mb-3">Add a new class</p>
            <FaPlusCircle
              onClick={() => setIsOpenClass(true)}
              className="text-5xl text-[#FFC700]"
            />
          </div>
        </div>
      </div>
      {/* Log out button */}
      <Button
        onClick={() => handleLogout(navigate)}
        className="mt-4 py-2 w-40 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
      >
        Log Out
      </Button>
    </div>
  );
};
