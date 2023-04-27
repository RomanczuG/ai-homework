import React, { useState } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import CryptoJS from "crypto-js";

const Tool = () => {
  const sampleData = [
    // {
    //   question: "Upload PDF to get started",
    //   analysis: "Here you will see the analysis of your PDF",
    // },
    // Add more questions and analyses as needed
  ];
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com"
    // timeout: 5000, // Add a 5 seconds timeout
  });
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(sampleData);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  // ! FILE UPLOAD
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };
  const hashFilename = (filename) => {
    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}-${filename}`;
    const hashedFilename = CryptoJS.SHA256(uniqueFilename).toString();
    const fileExtension = filename.split(".").pop();
    return `${hashedFilename}.${fileExtension}`;
  };

  const [uploadedFilename, setUploadedFilename] = useState(null);
  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      alert("Please select a file to upload");
      return;
    }

    // const data = await client.post("/api", { "data": "lmao" });
    // console.log("Data:", data);

    // Create FormData object
    const formData = new FormData();
    const hashedFilename = hashFilename(file.name);
    const newFile = new File([file], hashedFilename, { type: file.type });
    formData.append("file", newFile);
    console.log("Form data:", formData);
    // Send a POST request with the file to the Flask server
    try {
      console.log("Uploading file...");
      const response = await client.post("/upload", formData);
      console.log("File upload response:", response);

      if (response.status === 200) {
        alert("File uploaded successfully");
        console.log("File uploaded successfully");
        setUploadedFilename(response.data.filename); // Store the filename in the state
        setUploaded(true);
      } else {
        alert("File upload failed");
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  // ! GENERATE HELP

  const handleGenerate = async () => {
    try {
      if (!uploadedFilename) {
        console.error("No file uploaded");
        alert("Please upload a file first");
        return;
      }
      console.log("Generating help...");
      const response = await client.get(`/api/generate/${uploadedFilename}`);
      console.log("Generated help:", response.data);
      // const formattedData = response.data.map((question, help) => {
      //   return {
      //     question: question,
      //     analysis: help,
      //   };
      // });
      const formattedData = response.data;
      setOutput(formattedData);
      console.log("Formatted data:", formattedData);
      console.log("Output:", output);
      // Ignore the first empty element
    } catch (error) {
      console.error("Error generating help:", error);
    }
  };

  return (
    <div className="bg-[#252D62] min-h-screen">
      <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-semibold text-white mb-8">
  Homework & Exam Assistant
</h1>
<p className="text-xl text-yellow-400 mb-4">
  Note: Early beta, may retain some unnecessary text.
</p>
<p className="text-xl text-white mb-4">
  This tool scans PDF files, extracts questions, and removes extra information like instructions and page numbers for easier analysis.
</p>
<p className="text-xl text-white mb-4">
  Upload a PDF, click Generate, and receive quick, efficient homework help.
</p>

        <div className="flex flex-col space-y-4 items-center">
          <label className="bg-white flex justify-center text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
            {pdfSrc && (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}

            {file ? file.name : "Choose File"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {pdfSrc && (
            <button
              onClick={handleUpload}
              className="bg-indigo-600 flex hover:bg-indigo-700 w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300"
            >
              {uploaded && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
              Upload PDF File
            </button>
          )}

          <div className="mt-8">
            {uploaded && (
              <button
                onClick={handleGenerate}
                className="flex bg-indigo-600 hover:bg-indigo-700 w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300"
              >
                {/* <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg> */}
                Generate Help
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          {output !== sampleData && (
            <h2 className="text-2xl font-semibold text-white mb-4">
              Questions & Analysis
            </h2>
          )}

          <div className="w-full space-y-4">
            {output.map((item, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none">
                      <p>
                        {item.question.split("\n").map((line, index) => {
                          return <div key={index}>{line}</div>;
                        })}
                        {/* <span>{item.question}</span> */}
                      </p>
                      <span>{open ? "-" : "+"}</span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-white bg-gray-800 rounded-b-lg">
                      <p>
                        {/* {item.analysis} */}
                        {item.analysis.split("\n").map((line, index) => {
                          return <div key={index}>{line}</div>;
                        })}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
        {pdfSrc && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Uploaded PDF
            </h2>
            <embed
              src={pdfSrc}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tool;
