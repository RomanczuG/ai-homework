import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button, handleUpload } from "../utils/ToolUtils";
import axios from "axios";
import { ClipLoader } from "react-spinners";
export const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [newClass, setNewClass] = useState("");
  const [userID, setUserID] = useState(null);
  const [file, setFile] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const [uploadedFilename, setUploadedFilename] = useState(null);
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };

  const [uploadedLoading, setUploadedLoading] = useState(false);

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
        setSelectedClass(classes[0]);
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
    setUploadedLoading(true);
    const fileName = file.name;
    const classId = selectedClass.id;

    const { error } = await supabase
      .from("files")
      .insert([{ file_name: fileName, class_id: classId }]);

    if (error) {
      console.error("Error inserting record:", error);
    } else {
      console.log("file uploaded");
      fetchClassesWithFiles();
    }
    setUploadedLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-10">
      <h1 className="text-5xl font-bold mb-10 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
        Welcome to the center of your 
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
        AI study tool!
        </span>
      </h1>
      
  
      <div className="flex flex-col w-full space-y-6">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            placeholder="New Class"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
          />
          <button
            onClick={handleNewClass}
            className="ml-4 py-2 w-40 text-[#252D62] bg-[#FFC700] hover:bg-[#FF6E00] px-4  border text-md border-[#FFC700] rounded-md transition-all duration-200"
          >
            Create Class
          </button>
        </div>
  
        {classes.map((item, index) => (
  <div
    key={index}
    className="p-5 bg-white rounded-lg shadow-lg "
  >
    <h2 className="text-3xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700] ">
      {item.name}
    </h2>
    <div className="space-y-3">
      {item.files && Array.isArray(item.files) && item.files.length > 0 ? (
        item.files.map((file, index) => (
          <div key={index} className="flex items-center space-x-3 ">
            <div className="w-2 h-2 rounded-full bg-[#FFC700] mr-4"></div>
            <a href={file.file_url} className="text-blue-500 underline hover:text-blue-700">
              {file.file_name}
            </a>
          </div>
        ))
      ) : (
        <p>No files uploaded yet</p>
      )}
    </div>
  </div>
))}

  
        <div className="p-5 bg-white rounded-lg shadow-lg ">
            {/* Choose a call */}
            <label className="block text-sm font-medium text-gray-700">
                Upload your homework or textbook PDF file and pick a class to upload it to.
            </label>
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
</div>

    );
    };

