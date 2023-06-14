import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import {
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineUpload,
  HiOutlineChatAlt,
  HiOutlineDocumentDownload,
  HiOutlineDocumentText,
} from "react-icons/hi";
import {
  Modal,
  fetchClassesWithFiles,
  handleNewClass,
  handleFileUploadDashboard,
  handleLogout,
  downloadStudyNote,
} from "../utils/DashboardUtils";
import { Button } from "../utils/ToolUtils";

export const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClass, setNewClass] = useState("");
  const [file, setFile] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpenClass, setIsOpenClass] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    // Immediately fetch on component mount
    fetchClassesWithFiles(setClasses, setSelectedClass);

    console.log("classes:", classes);

    // Then set up an interval to fetch every minute
    const intervalId = setInterval(() => {
      fetchClassesWithFiles(setClasses, setSelectedClass);
    }, 60 * 1000); // 60,000 milliseconds = 1 minute

    // Return a cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array so this runs once on mount and not on every render

  const handleFileUpload = async () => {
    setLoading(true);
    const id = await handleFileUploadDashboard(
      // setUploadedLoading,
      file,
      selectedClass,
      setClasses,
      setSelectedClass
    );
    window.sa_event("File Upload", { file_id: id });
    console.log("id:", id);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F0FFE0] flex flex-col items-center py-12 px-6 sm:px-8 lg:px-10">
      {/* {filesGenerated && ( 
        <div> generated </div>
      )} */}
      <Modal isOpen={loading} setIsOpen={setLoading}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex bg-white items-center justify-center rounded-lg shadow-lg p-5 text-center">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-2 text-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
                Uploading your file
              </h1>
              <p className="text-gray-500">
                Please wait while we upload your file.
              </p>
              <ClipLoader
                className="mt-4"
                size={25}
                // Blue color
                color={"#252D62"}
                loading={true}
              />
            </div>
          </div>
        </div>
      </Modal>
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
            <div className="mt-4 ">
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
                Choose a class and upload your homework or textbook PDF file. Study Notes are available for shorter files only.
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
                <div className="mt-4 ">
                  <Button
                    onClick={() => {
                      handleFileUpload();
                      setIsOpenFile(false);
                    }}
                    className="py-2 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
                  >
                    <HiOutlineUpload className="mr-2" />
                    Upload File
                  </Button>
                </div>
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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((item, index) => (
            <motion.div
              key={index}
              className="p-5 min-h-[25vh] bg-white rounded-lg shadow-lg "
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
                {item.name}
              </h2>
              <div className="space-y-3">
                {item.files &&
                Array.isArray(item.files) &&
                item.files.length > 0 ? (
                  item.files.map((file, index) => (
                    <motion.div
                      key={index}
                      className="group flex items-center space-x-3 p-2 bg-gray-50 rounded-lg relative hover:bg-gray-100"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <div className="mr-2">
                        <HiOutlineDocumentText className="text-red-500" />
                      </div>
                      <div className="flex-grow">
                        <a
                          href={file.file_url}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          {file.file_name}
                        </a>
                      </div>

                      <div className="flex space-x-4 absolute right-0 mr-4">
                        <div className="group relative">
                          {file.faiss_created == "true" ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              onClick={() => {
                                console.log(file);
                                window.sa_event("Chat", { file_id: file.id });
                                navigate("/dashboard/chat", {
                                  state: {
                                    hashedFaissFilename:
                                      file.hashedFaissFilename,
                                    pdfFilename: file.file_name,
                                    hashedFilename: file.hashed_file_name,
                                  },
                                });
                              }}
                              className="flex items-center p-1 hover:py-1 hover:px-2 rounded-full text-white bg-[#FFC700] hover:bg-[#FF6E00]"
                            >
                              <HiOutlineChatAlt size={20} />
                              <span className="text-xs transition-all ease-in duration-200 text-transparent group-hover:text-white whitespace-nowrap  py-1 ml-1 rounded-sm absolute group-hover:static">
                                Chat with the file
                              </span>
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              className="flex items-center p-1 hover:py-1 hover:px-2 rounded-full text-white bg-[#FFC700] hover:bg-[#FF6E00]"
                            >
                              <ClipLoader
                                size={20}
                                color={"#ffffff"}
                                loading={true}
                              />
                              <span className="text-xs transition-all ease-in duration-200 text-transparent group-hover:text-white whitespace-nowrap  py-1 ml-1 rounded-sm absolute group-hover:static">
                                Proccesing file for chat
                              </span>
                            </motion.button>
                          )}
                        </div>

                        <div className="group relative">
                          {file.study_notes_created == "true" || file.study_notes_created == "impossible" ? (

                            file.study_notes_created == "true" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              onClick={() => {
                                window.sa_event("Study Notes", {
                                  file_id: file.id,
                                });
                                downloadStudyNote(
                                  file.hashedStudyNotesFilename
                                );
                              }}
                              className="flex items-center p-1 hover:py-1 hover:px-2 rounded-full text-white bg-[#FFC700] hover:bg-[#FF6E00]"
                            >
                              <HiOutlineDocumentDownload size={20} />
                              <span className="text-xs transition-all ease-in duration-200 text-transparent group-hover:text-white whitespace-nowrap  py-1 ml-1 rounded-sm absolute group-hover:static">
                                Download study notes
                              </span>
                            </motion.button>
                            ) 
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              // onClick={() =>
                              //   downloadStudyNote(file.hashedStudyNotesFilename)
                              // }
                              className="flex items-center p-1 hover:py-1 hover:px-2 rounded-full text-white bg-[#FFC700] hover:bg-[#FF6E00]"
                            >
                              <ClipLoader
                                size={20}
                                color={"#ffffff"}
                                loading={true}
                              />
                              <span className="text-xs transition-all ease-in duration-200 text-transparent group-hover:text-white whitespace-nowrap  py-1 ml-1 rounded-sm absolute group-hover:static">
                                Generating study notes
                              </span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p>No files uploaded yet</p>
                )}
                <motion.div
                  onClick={() => setIsOpenFile(true)}
                  className="cursor-pointer flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiOutlinePlus className="text-md text-[#a4c1ae] mr-2" />
                  <p className="text-gray-500">Add a new file</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
          <motion.div
            onClick={() => setIsOpenClass(true)}
            className="cursor-pointer p-5 min-h-[25vh] bg-white rounded-lg shadow-lg flex flex-col items-center place-content-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <p className="mb-3">Add a new class</p>
            <FaPlusCircle className="text-5xl text-[#a4c1ae]" />
          </motion.div>
        </div>
      </div>
      {/* Log out button */}
      <div className="mt-4 ">
        <Button
          onClick={() => handleLogout(navigate)}
          className="mt-4 py-2 w-40 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
        >
          <HiOutlineLogout className="mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};
