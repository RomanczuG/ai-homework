import { hashFilename } from "./ToolUtils";
import { supabase } from "../supabaseClient";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});
// const navigate = useNavigate()
export   const handleLogout = async () => {

  const { error } = await supabase.auth.signOut()
  if (error) {
    alert(error)
  }
  else
  {

  }

    
}

export const Modal = ({ children, isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const fetchClassesWithFiles = async (setClasses, setSelectedClass) => {
  const { data, errorUser } = await supabase.auth.getSession();
  if (errorUser) {
    console.error("Error getting user session:", errorUser);
  } else {
    const userID = data["session"]["user"]["id"];
    //   setUserID(userID);
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

export const handleNewClass = async (
  setNewClass,
  newClass,
  setClasses,
  setSelectedClass
) => {
  const { data, errorUser } = await supabase.auth.getSession();
  if (errorUser) {
    console.error("Error getting user session:", errorUser);
  } else {
    const userID = data["session"]["user"]["id"];

    const { error } = await supabase
      .from("classes")
      .insert([{ name: newClass, user_id: userID }]);

    // console.log(supabase.auth.getUser());

    if (error) {
      console.error("Error creating class:", error);
    } else {
      setNewClass("");
      fetchClassesWithFiles(setClasses, setSelectedClass);
    }
  }
};

export const handleFileUploadDashboard = async (
  setUploadedLoading,
  file,
  selectedClass,
    setClasses,
    setSelectedClass
) => {
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
  console.log("Hashed filename" + hashedFilename);
  console.log("File name" + fileName);
  console.log("Class id" + classId);
  const fileSize = file.size;
  const { error } = await supabase
    .from("files")
    .insert([
      {
        file_name: fileName,
        class_id: classId,
        hashed_file_name: hashedFilename,
      },
    ]);

  if (error) {
    console.error("Error inserting record:", error);
  } else {
    console.log("File uploaded to supabase");
    //   fetchClassesWithFiles();
  }

  try {
    const response = await client.post("/upload", formData);
    console.log("File upload response:", response);

    if (response.status === 200) {
      window.sa_event("PDF successfull upload", {
        filename: file.name,
        fileSize,
      });
      console.log("File uploaded to flask server "); // Store the filename in the state
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
  fetchClassesWithFiles(setClasses, setSelectedClass);
  setUploadedLoading(false);
};
