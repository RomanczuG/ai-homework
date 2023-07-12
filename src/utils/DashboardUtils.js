import { hashFilename } from "./ToolUtils";
import { supabase } from "../supabaseClient";
import axios from "axios";
import { toast } from 'react-toastify';

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

export const getAuthToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }
  // console.log("Session:", data["session"]["access_token"]);
  return data ? data.session.access_token : null;
};

async function getUserId() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }

  return data["session"]["user"]["id"];
}

export const downloadStudyNote = async (hashedStudyNotesFilename) => {
  const filename = hashedStudyNotesFilename;
  const token = await getAuthToken();
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  console.log("In downloadStudyNote, filename:", filename);
  // Send a POST request to the backend with the filename to download the file
  client
    .post(
      "/download_dashboard",

      { filename: filename },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    ) // Add 'blob' responseType
    .then((response) => {
      console.log("Download response:", response);
      // Create a blob from the response data and download it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "document.docx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Download failed:", error);
    });
};

export const handleLogout = async (navigate) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error);
  } else {
    navigate("/");
  }
};

export const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative flex justify-center" // add 'flex' and 'justify-center' here
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const fetchClassesWithFiles = async (setClasses, setSelectedClass) => {
  try {
    client
      .get("/warmup-endpoint")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    const userID = await getUserId();
    const { data: classes, error } = await supabase
      .from("classes")
      .select("*, files(*)") // This joins the classes with their associated files
      .eq("user_id", userID);

    if (error) {
      console.error("Error fetching classes:", error);
      return;
    }
    setClasses(classes);
    setSelectedClass(classes[0].id); // set selectedClass to be the id of the first class
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

// ! HANDLE UPLOAD and GENERATE NOTES
export const handleNewClass = async (
  setNewClass,
  newClass,
  setClasses,
  setSelectedClass
) => {
  try {
    const userID = await getUserId();

    const { error } = await supabase
      .from("classes")
      .insert([{ name: newClass, user_id: userID }]);

    // console.log(supabase.auth.getUser());

    if (error) {
      console.error("Error creating class:", error);
    } else {
      setNewClass("");
      window.sa_event("New class created", { class: newClass });
      fetchClassesWithFiles(setClasses, setSelectedClass);
    }
  } catch (error) {
    console.error("Error fetching classes:", error);
  }
};

export const handleFileUploadDashboard = async (
  file,
  selectedClass,
  setClasses,
  setSelectedClass
) => {
  console.log("In handleFileUploadDashboard");
  validateFile(file);
  console.log("File validated");
  const formData = await prepareFormData(file, selectedClass);
  console.log("Form data prepared");

  // console.log("File uploaded to supabase:", fileId);

  try {
    // await uploadFileToSupabase(formData);
    await uploadFileToFlaskServer(formData);
    
  } catch (error) {
    handleUploadFailure(error);
  }

  fetchClassesWithFiles(setClasses, setSelectedClass);

  // return fileId;
};

const validateFile = (file) => {
  if (!file) {
    console.error("No file selected");
    alert("Please select a file to upload");
    throw new Error("No file selected");
  }

  const maxSize = 15 * 1024 * 1024; // 15MB in bytes
  if (file.size > maxSize) {
    alert("File size exceeds 15MB limit. Please select a smaller file.");
    throw new Error("File size limit exceeded");
  }
};

const prepareFormData = async (file, selectedClass) => {
  const hashedFilename = hashFilename(file.name); // This is the hashed filename
  const newFile = new File([file], hashedFilename, { type: file.type });
  const formData = new FormData();
  formData.append("file", newFile);
  formData.append("filename", file.name);
  formData.append("hashedFilename", hashedFilename);
  formData.append(
    "hashedStudyNotesFilename",
    hashFilename(file.name + "_help.docx")
  );
  formData.append(
    "hashedFaissFilename",
    hashFilename(file.name + "_faiss.json")
  );
  formData.append("user_id", await getUserId());
  formData.append("classId", selectedClass);

  return formData;
};

const uploadFileToFlaskServer = async (formData) => {
  const token = await getAuthToken();
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  const response = await client.post("/gen_upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error(response.data.message);
  }

  window.sa_event("PDF successful upload", {
    filename: formData.get("file").name,
    fileSize: formData.get("file").size,
  });

  console.log("File uploaded to flask server");
  // toast.success("File uploaded successfully. Please wait a few minutes for the file to be processed.");
};

export const removeFile = async (hashed_file_name) => {
  const token = await getAuthToken();
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }
  const formData = new FormData();
  formData.append("hashed_file_name", hashed_file_name);
  const response = await client.post("/remove_file", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    alert("Error removing file");
    throw new Error(response.data.message);
  }
  console.log("File removed from flask server");
  toast.success("File removed successfully");
};

const handleUploadFailure = async (error) => {
  let errorMessage = error.message;
  console.log("Error response:", error.response);
  console.log("Error response data:", error.response.data);

  if (error.response && error.response.data) {
    const serverResponse = error.response.data;
    if (serverResponse && serverResponse.message) {
      errorMessage = serverResponse.message;
    }
  }

  // alert("File upload failed. " + errorMessage);
  toast.error("File upload failed. " + errorMessage);

  window.sa_event("PDF failed upload", { error: errorMessage });

  console.error("Error during file upload:", error);
};
