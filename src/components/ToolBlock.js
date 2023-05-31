import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import {
  handleDownloadDocument,
  handleFileChange,
  handleUpload,
  handleStages,
  Button,
  CheckIcon,
  Stage,
} from "../utils/ToolUtils";

const ToolBlock = () => {
  const client = axios.create({
    // baseURL: "http://127.0.0.1:5000",
    baseURL: "https://studyboost.uc.r.appspot.com",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState(sampleData);
  const [outputLoading, setOutputLoading] = useState(false);
  const [pdfSrc, setPdfSrc] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedLoading, setUploadedLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [uploadedFilename, setUploadedFilename] = useState(null);
  const sampleData = [];

  return (
    <section className="container mx-auto px-4 py-4">
      <div className="bg-[#F0FFE0] flex flex-col space-y-4 items-center">
        <label className="bg-white flex justify-center text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
          {pdfSrc && <CheckIcon />}

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
        )}

        {/* <div className="mt-8">
          <div className="flex flex-col items-center"> */}
            {uploaded && !outputLoading && (
              <Button 
                onClick={() =>
                  handleStages(
                    setOutputLoading,
                    uploadedFilename,
                    client,
                    setOutput,
                    output,
                    setGenerated,
                    setStage
                  )
                }
              >
                {generated && <CheckIcon />}
                Generate Help
  
              </Button>
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
          {/* </div>
        </div> */}

        <div className="mt-8 ">
          {generated && (
            <div className="flex flex-col items-center">
              <p className="text-xl text-black mb-4">
                Download the generated help as a word document.
              </p>
              <Button onClick={() => handleDownloadDocument(client, output)}>
                Download Help
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolBlock;
