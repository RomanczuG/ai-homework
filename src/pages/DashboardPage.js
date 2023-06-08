import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button, hashFilename, Modal } from "../utils/ToolUtils";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaPlusCircle, FaFilePdf } from "react-icons/fa";
export const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClass, setNewClass] = useState("");
  const [userID, setUserID] = useState(null);
  const [file, setFile] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [uploadedLoading, setUploadedLoading] = useState(false);
  const [isOpenClass, setIsOpenClass] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    fetchClassesWithFiles();
  }, []);

  const fetchClassesWithFiles = async () => {
    const { data, errorUser } = await supabase.auth.getSession();
    if (errorUser) {
      console.error("Error getting user session:", errorUser);
    } else {
      const userID = data["session"]["user"]["id"];
      setUserID(userID);
      const { data: classes, error } = await supabase
        .from("classes")
        .select("*, files(*)") // This joins the classes with their associated files
        .eq("user_id", userID);

      if (error) {
        console.error("Error fetching classes:", error);
      } else {
        setClasses(classes);
        setSelectedClass(classes[0].id); // set selectedClass to be the id of the first class
      }
    }
  };

  const handleNewClass = async () => {
    const { error } = await supabase
      .from("classes")
      .insert([{ name: newClass, user_id: userID }]);

    // console.log(supabase.auth.getUser());

    if (error) {
      console.error("Error creating class:", error);
    } else {
      setNewClass("");
      fetchClassesWithFiles();
    }
  };
  const handleFileUpload = async () => {

    if (!file) {
      console.error("No file selected");
      alert("Please select a file to upload");
      return;
    }
    setUploadedLoading(true);
    const fileName = file.name;
    const classId = selectedClass; // selectedClass is already an id
    const formData = new FormData();
    const hashedFilename = hashFilename(file.name);
    const newFile = new File([file], hashedFilename, { type: file.type });
    formData.append("file", newFile);
    console.log("Form data:", formData);
    console.log("Hashed filename" + hashFilename)
    console.log("File name" + fileName)
    console.log("Class id" + classId)
    const fileSize = file.size;
    const { error } = await supabase
      .from("files")
      .insert([{ file_name: fileName, class_id: classId, hashed_file_name: hashFilename }]);

    if (error) {
      console.error("Error inserting record:", error);
    } else {
      console.log("File uploaded to supabase");
      fetchClassesWithFiles();
    }

    try {
      const response = await client.post("/upload", formData);
      console.log("File upload response:", response);
  
      if (response.status === 200) {
        window.sa_event("PDF successfull upload", {
          filename: file.name,
          fileSize,
        });
        console.log("File uploaded to flask server ");// Store the filename in the state
        
      } else {
        alert("File upload failed");
        console.error(
          "File upload failed. Check internet connection and try again."
        );
      }
    } catch (error) {
      alert("File upload failed. Check internet connection and try again.");
      window.sa_event("PDF failed upload", { error: error.message });
      console.error("Error during file upload:", error);
    }

    setUploadedLoading(false);
  };

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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
            />
            <button
              onClick={handleNewClass}
              className="mt-4 py-2 w-40 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
            >
              Create Class
            </button>
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
                  onClick={handleFileUpload}
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
                        <button
                          // onClick={() => createStudyNote(file.file_id)}
                          className="px-2 py-1 ml-2 rounded-md text-white bg-green-500 hover:bg-green-600"
                        >
                          Download Study Notes
                        </button>
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
    </div>
  );
};
