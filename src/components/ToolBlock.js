import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Disclosure } from "@headlessui/react";
import CryptoJS from "crypto-js";
import { ClipLoader, BarLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa";

const Stage = ({ stageNumber, currentStage, stageName, isLoading }) => {
  return (
    <div className="flex items-center space-x-2">
      {currentStage > stageNumber && (
        <FaCheck className="text-green-500" size={20} />
      )}
      {isLoading && (
        <BarLoader width={20} height={4} color={"#3f51b5"} loading={true} />
      )}
      <span
        className={`text-md text-black ${
          currentStage >= stageNumber ? "font-bold" : "font-normal"
        }`}
      >
        {stageName}
      </span>
    </div>
  );
};

const ToolBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const handleStages = async () => {
    setOutputLoading(true);

    const handleGeneratePromise = handleGenerate();
    const stagePromises = Array.from({ length: 4 }, (_, i) =>
      new Promise((resolve) => setTimeout(resolve, i * 25000)).then(() => {
        setStage((prevStage) => Math.max(prevStage, i + 1));
      })
    );
    // setStage(4);
    await Promise.all([...stagePromises, handleGeneratePromise]);
    setStage(5);
    setOutputLoading(false);
  };

  const sampleData = [
    // {
    //   question: "Upload PDF to get started",
    //   analysis: "Here you will see the analysis of your PDF",
    // },
    // Add more questions and analyses as needed
  ];
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(sampleData);
  const [outputLoading, setOutputLoading] = useState(false);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedLoading, setUploadedLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  // ! FILE DOWNLOAD
  const handleDownloadDocument = () => {
    // Inside each function
    const currentDate = new Date().toISOString();
    window.sa_event("Download Doc file", { date: currentDate });

    client
      .post(
        "/api/testdownload",
        {
          sampleDatatest: output,
        },
        {
          responseType: "blob", // Add this line to handle file downloads
        }
      )
      .then((res) => {
        console.log(res);
        // Create a link to download the file
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "assistance.docx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        window.sa_event("Download Doc Error", { error: err.message });
        alert("Error in downloading file");
        console.log(err);
      });
  };

  // ! FILE UPLOAD
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
    setUploaded(false);
    setGenerated(false);
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
    const currentDate = new Date().toISOString();
    window.sa_event("Upload file", { date: currentDate });
    setUploadedLoading(true);

    const formData = new FormData();
    const hashedFilename = hashFilename(file.name);
    const newFile = new File([file], hashedFilename, { type: file.type });
    formData.append("file", newFile);
    console.log("Form data:", formData);
    // Inside handleUpload function
    const fileSize = file.size; // In bytes
    window.sa_event("PDF Upload", { filename: file.name, fileSize });

    // Send a POST request with the file to the Flask server
    try {
      console.log("Uploading file...");
      const response = await client.post("/upload", formData);
      console.log("File upload response:", response);

      if (response.status === 200) {
        console.log("File uploaded successfully");
        setUploadedFilename(response.data.filename); // Store the filename in the state
        setUploaded(true);
      } else {
        alert("File upload failed");
        console.error(
          "File upload failed. Check internet connection and try again."
        );
      }
    } catch (error) {
      alert("File upload failed. Check internet connection and try again.");
      window.sa_event("Uploading File Error", { error: error.message });
      console.error("Error during file upload:", error);
    }
    setUploadedLoading(false);
  };

  // ! GENERATE HELP

  const handleGenerate = async () => {
    const currentDate = new Date().toISOString();
    window.sa_event("Generate help", { date: currentDate });
    // At the beginning of the function
    const startTime = new Date().getTime();

    // After the operation is complete

    setOutputLoading(true);
    try {
      if (!uploadedFilename) {
        console.error("No file uploaded");
        alert("Please upload a file first");
        return;
      }
      console.log("Generating help...");
      const response = await client.get(`/api/generate/${uploadedFilename}`);
      console.log("Generated help:", response.data);
      const formattedData = response.data;
      setOutput(formattedData);
      console.log("Formatted data:", formattedData);
      console.log("Output:", output);
      setGenerated(true);
      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime) / 1000; // In seconds
      window.sa_event("Generating Help", { timeTaken });
    } catch (error) {
      // Inside the catch block
      window.sa_event("Generating Help Error", { error: error.message });

      alert("PDF file is too long, please try to use shorter pdf files.");
      console.error("Error generating help:", error);
    }
    setOutputLoading(false);
  };

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="bg-[#F0FFE0] flex flex-col space-y-4 items-center">
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
            className="bg-[#FFC700] flex hover:bg-[#FF6E00] w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300"
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
            {uploadedLoading && (
              <ClipLoader
                className="mr-1"
                size={25}
                color={"#ffffff"}
                loading={true}
              />
            )}
            Upload PDF File
          </button>
        )}

        <div className="mt-8">
          <div className="flex flex-col items-center">
            {uploaded && !outputLoading && (
              <button
                onClick={handleStages}
                className="flex bg-[#FFC700] hover:bg-[#FF6E00] w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300"
              >
                {generated && (
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
                Generate Help
              </button>
            )}
            <div className="w-full h-2 ">
              {outputLoading && (
                <>
                  <p className="text-xl text-black mb-4">
                    Note: It can take up to 20/30 seconds per question to
                    generate an analysis.
                  </p>
                  <div className="flex space-x-4 mb-4">
                    <Stage
                      stageNumber={1}
                      currentStage={stage}
                      stageName="Scanning Text"
                      isLoading={stage === 1}
                    />
                    <Stage
                      stageNumber={2}
                      currentStage={stage}
                      stageName="Cleaning Text"
                      isLoading={stage === 2}
                    />
                    <Stage
                      stageNumber={3}
                      currentStage={stage}
                      stageName="Extracting Questions"
                      isLoading={stage === 3}
                    />
                    <Stage
                      stageNumber={4}
                      currentStage={stage}
                      stageName="Generating Help"
                      isLoading={isLoading && stage === 4}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 ">
          {generated && (
            <div className="flex flex-col items-center">
              <p className="text-xl text-black mb-4">
                Download the generated help as a word document.
              </p>
              <button
                onClick={handleDownloadDocument}
                className="flex bg-[#FFC700] hover:bg-[#FF6E00] w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300"
              >
                Download Help
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolBlock;
