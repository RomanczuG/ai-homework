import React, { useState } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import CryptoJS from 'crypto-js';

const Tool = () => {
  const sampleData = [
    {
      question: "Question 1",
      analysis: "This is the analysis for Question 1.",
    },
    {
      question: "Question 2",
      analysis: "This is the analysis for Question 2.",
    },
    // Add more questions and analyses as needed
  ];
  const client = axios.create({
    baseURL: "http://127.0.0.1:5000",
    // timeout: 5000, // Add a 5 seconds timeout
  });
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState({ test: "test" });
  const [pdfSrc, setPdfSrc] = useState(null);

  // ! FILE UPLOAD
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };
  const hashFilename = (filename) => {
    const timestamp = new Date().getTime();
    const uniqueFilename = `${timestamp}-${filename}`;
    const hashedFilename = CryptoJS.SHA256(uniqueFilename).toString();
    const fileExtension = filename.split('.').pop();
    return `${hashedFilename}.${fileExtension}`;
  };

  const [uploadedFilename, setUploadedFilename] = useState(null);
  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      alert("Please select a file to upload");
      return;
    }

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
      console.log('Generating help...');
      const response = await client.get(`/api/generate/${uploadedFilename}`);
      console.log('Generated help:', response.data.generated_help);
      const formattedData = response.data.map((question, help) => {
        return {
          question: question,
          analysis: help,
        };
      });
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
          Note: This tool is in early beta. It may sometimes keep unnecessary
          text.
        </p>
        <p className="text-xl text-white mb-4">
          The Homework Helper scans homework or exam PDF files, removing
          unnecessary information like instructions, page numbers, etc., and
          extracting separate questions for easier analysis.
        </p>
        <p className="text-xl text-white mb-4">
          The goal of this tool is to provide quick and efficient homework help
          by analyzing your uploaded PDF files.
        </p>
        <p className="text-lg text-white mb-4">
          Select a PDF file, upload it, and then click on Generate to receive
          help.
        </p>
        <div className="flex flex-col space-y-4 items-center">
          <label className="bg-white text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
            {file ? file.name : "Choose File"}
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            onClick={handleUpload}
            className="bg-indigo-600 hover:bg-indigo-700 w-40 text-white rounded-md px-3 py-2 transition duration-300"
          >
            Upload PDF File
          </button>
          <div className="mt-8">
            {}
            <button
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-700 w-40 text-white rounded-md px-3 py-2 transition duration-300"
            >
              Generate Help
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Questions & Analysis
          </h2>
          <div className="w-full space-y-4">
            {sampleData.map((item, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none">
                      <span>{item.question}</span>
                      <span>{open ? "-" : "+"}</span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-white bg-gray-800 rounded-b-lg">
                      {item.analysis}
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
