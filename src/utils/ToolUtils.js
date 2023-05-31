import CryptoJS from "crypto-js";
import { FaCheck } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import { useState } from "react";
export const hashFilename = (filename) => {
  const timestamp = new Date().getTime();
  const uniqueFilename = `${timestamp}-${filename}`;
  const hashedFilename = CryptoJS.SHA256(uniqueFilename).toString();
  const fileExtension = filename.split(".").pop();
  return `${hashedFilename}.${fileExtension}`;
};

// ! FILE DOWNLOAD
export const handleDownloadDocument = (client, output) => {
  // Inside each function
  window.sa_event("Download Doc file");

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

// ! FILE CHANGE
export const handleFileChange = (
  e,
  setFile,
  setPdfSrc,
  setUploaded,
  setGenerated
) => {
  setFile(e.target.files[0]);
  setPdfSrc(URL.createObjectURL(e.target.files[0]));
  setUploaded(false);
  setGenerated(false);
};

// ! FILE UPLOAD

export const handleUpload = async (
  client,
  file,
  setUploadedLoading,
  setUploadedFilename,
  setUploaded
) => {
  if (!file) {
    console.error("No file selected");
    alert("Please select a file to upload");
    return;
  }
  setUploadedLoading(true);

  const formData = new FormData();
  const hashedFilename = hashFilename(file.name);
  const newFile = new File([file], hashedFilename, { type: file.type });
  formData.append("file", newFile);
  console.log("Form data:", formData);
  // Inside handleUpload function
  const fileSize = file.size; // In bytes

  // Send a POST request with the file to the Flask server
  try {
    console.log("Uploading file...");
    const response = await client.post("/upload", formData);
    console.log("File upload response:", response);

    if (response.status === 200) {
      window.sa_event("PDF successfull upload", {
        filename: file.name,
        fileSize,
      });
      console.log("File uploaded ");
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
    window.sa_event("PDF failed upload", { error: error.message });
    console.error("Error during file upload:", error);
  }
  setUploadedLoading(false);
};

// ! GENERATE HELP
export const handleGenerate = async (
  setOutputLoading,
  uploadedFilename,
  client,
  setOutput,
  output,
  setGenerated
) => {
  window.sa_event("Generate help - Started");
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
    window.sa_event("Generate Help - Time", { timeTaken });
  } catch (error) {
    // Inside the catch block
    window.sa_event("Generate Help - Error", { error: error.message });

    alert("PDF file is too long, please try to use shorter pdf files.");
    console.error("Error generating help:", error);
  }
  setOutputLoading(false);
};

// ! HANDLE STAGES
export const handleStages = async (
  setOutputLoading,
  uploadedFilename,
  client,
  setOutput,
  output,
  setGenerated,
  setStage
) => {
  setOutputLoading(true);

  const handleGeneratePromise = handleGenerate(
    setOutputLoading,
    uploadedFilename,
    client,
    setOutput,
    output,
    setGenerated
  );
  const stagePromises = Array.from({ length: 4 }, (_, i) =>
    new Promise((resolve) => setTimeout(resolve, i * 25000)).then(() => {
      setStage((prevStage) => Math.max(prevStage, i + 1));
    })
  );
  // setStage(4);
  await Promise.all([...stagePromises, handleGeneratePromise]);
  setStage(4);
  setOutputLoading(false);
};

// ! STAGE

export const Stage = ({ stageNumber, currentStage, stageName, isLoading }) => {
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

// ! BUTTONS
export const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-[#FFC700] hover:bg-[#FF6E00] w-48 justify-center text-white rounded-md px-3 py-2 transition duration-300 flex items-center space-x-2"
  >
    {children}
  </button>
);

// ! CHECKBOX
export const CheckIcon = () => (
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
);


export const ActionButtons = ({ handleStudyNotes, handleChatBot }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const selectAction = (action) => {
    setSelectedAction(action);

    if (action === 'notes') {
      handleStudyNotes();
    } else if (action === 'chat') {
      handleChatBot();
    }
  }

  return (
    <div className="flex border rounded-md overflow-hidden">
      <button
        onClick={() => selectAction('notes')}
        className={`flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ease-in-out ${selectedAction === 'notes' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
      >
        Generate Study Notes
      </button>
      <button
        onClick={() => selectAction('chat')}
        className={`flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ease-in-out ${selectedAction === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
      >
        Talk with Chat Bot
      </button>
    </div>
  );
}
