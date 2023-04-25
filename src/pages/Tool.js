import React, { useState } from "react";
import axios from "axios";

const Tool = () => {
  const client = axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [pdfSrc, setPdfSrc] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPdfSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);

    // Send a POST request with the file to the Flask server
    try {
      const response = await client.post("/upload", formData);

      if (response.status === 200) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  const handleGenerate = async () => {
    // Replace this URL with your Flask server URL
    const apiUrl = 'https://your-flask-server-url/api/generate';

    try {
      const response = await axios.get(apiUrl);
      setOutput(response.data.generated_help);
    } catch (error) {
      console.error('Error generating help:', error);
    }
  };

  return (
    <div className="bg-[#252D62] min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-semibold text-white mb-8">PDF Uploader</h1>
        <div className="flex flex-col space-y-4 items-center">
          <label className="bg-white text-black py-2 px-4 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300">
            {file ? file.name : 'Choose File'}
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
            Generated Help
          </h2>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 bg-gray-100 rounded-lg resize-none"
          />
        </div>
        {pdfSrc && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Uploaded PDF</h2>
            <embed src={pdfSrc} type="application/pdf" width="100%" height="600px" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tool;
