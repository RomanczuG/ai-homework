import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import {
  handleDownloadDocument,
  handleFileChange,
  handleUpload,
  handleStages,
  Button,
  CheckIcon,
  Stage,
  ActionButtons,
} from "../utils/ToolUtils";

const ToolBlock = () => {
  const navigate = useNavigate(); 
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const [stage, setStage] = useState(0);
  const [file, setFile] = useState(null);
  const sampleData = [];
  const [output, setOutput] = useState(sampleData);
  const [outputLoading, setOutputLoading] = useState(false);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedLoading, setUploadedLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const [actionType, setActionType] = useState("study-notes");

  const handleStart = () => {
    if (actionType === "study-notes") {
      handleStages(
        setOutputLoading,
        uploadedFilename,
        client,
        setOutput,
        output,
        setGenerated,
        setStage
      );
    } else if (actionType === "chat-bot") {
      navigate("/chat", { state: { uploadedFilename } });// replace "/chat" with the path to your chat page
    }
  };

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="bg-[#F0FFE0] flex flex-col space-y-4 items-center">
        <h2 className="text-xl text-black ">Step 1: Choose your PDF file</h2>
        <label className="bg-white flex justify-center text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
          {file ? file.name : "Choose File"}
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              handleFileChange(e, setFile, setPdfSrc, setUploaded, setGenerated)
            }
            className="hidden"
          />
        </label>

        {pdfSrc && (
          <>
            <h2 className="text-xl text-black mb-4">
              Step 2: Upload your PDF file
            </h2>
            <Button
              onClick={() =>
                handleUpload(
                  client,
                  file,
                  setUploadedLoading,
                  setUploadedFilename,
                  setUploaded
                )
              }
            >
              {uploaded && <CheckIcon />}
              {uploadedLoading && (
                <ClipLoader
                  className="mr-1"
                  size={25}
                  color={"#ffffff"}
                  loading={true}
                />
              )}
              Upload PDF File
            </Button>
          </>
        )}

        {uploaded && !outputLoading && (
          <>
            <h2 className="text-xl text-black mb-4">
              Step 3: Choose an action
            </h2>

            <ActionButtons
              handleStudyNotes={() => setActionType("study-notes")}
              handleChatBot={() => setActionType("chat-bot")}
            ></ActionButtons>
            <Button onClick={handleStart} disabled={!actionType}>
              {generated && <CheckIcon />}
              Start
            </Button>
          </>
        )}
        <div className="mt-8">
          {outputLoading && (
            <>
              <h2 className="text-xl text-black mb-4">
                Step 4: Generating analysis...
              </h2>
              <p className="text-md text-black mb-4">
                It can take up to 20/30 seconds per question to generate an
                analysis. Get a coffee or tea and relax &#x2615;
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
                />
                <Stage
                  stageNumber={4}
                  currentStage={stage}
                  stageName="Generating Help"
                  isLoading={stage === 4}
                />
              </div>
            </>
          )}
        </div>
        <div className="mt-8">
          {generated && (
            <>
              <h2 className="text-xl text-black mb-4">
                Step 5: Download the result
              </h2>

              <div className="flex flex-col items-center">
                <p className="text-md text-black mb-4">
                  Download the generated help as a word document.
                </p>
                <Button onClick={() => handleDownloadDocument(client, output)}>
                  Download Help
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolBlock;
