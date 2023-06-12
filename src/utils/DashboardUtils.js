import { hashFilename } from "./ToolUtils";
import { supabase } from "../supabaseClient";
import axios from "axios";

const client = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://studyboost.uc.r.appspot.com",
});

async function getUserId() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting user session:", error);
    throw error;
  }

  return data["session"]["user"]["id"];
}

export const downloadStudyNote = async (hashedStudyNotesFilename) => 
  {
    const filename = hashedStudyNotesFilename;
    console.log('In downloadStudyNote, filename:', filename);
    // Send a POST request to the backend with the filename to download the file
    axios.post('/download_dashboard', { filename }, { responseType: 'blob' })  // Add 'blob' responseType
      .then(response => {
        console.log('Download response:', response);
        // Create a blob from the response data and download it
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'document.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error);
      });
  }

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
      fetchClassesWithFiles(setClasses, setSelectedClass);
    }
  } catch (error) {
    console.error("Error fetching classes:", error);
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

  // Upload file to supabase

  const fileName = file.name; // This is the original filename
  const classId = selectedClass; // selectedClass is already an id
  const formData = new FormData();
  const hashedFilename = hashFilename(file.name); // This is the hashed filename
  const hashedStudyNotesFilename = hashFilename(file.name + "_help.docx");
  const hashedFaissFilename = hashFilename(file.name + "_faiss.json");
  const newFile = new File([file], hashedFilename, { type: file.type });
  formData.append("file", newFile);
  formData.append("hashedStudyNotesFilename", hashedStudyNotesFilename);
  formData.append("hashedFaissFilename", hashedFaissFilename);
  console.log("Form data:", formData);
  const fileSize = file.size;
  const { data, error } = await supabase
    .from("files")
    .insert([
      {
        file_name: fileName,
        class_id: classId,
        hashed_file_name: hashedFilename,
        hashedFaissFilename: hashedFaissFilename,
        hashedStudyNotesFilename: hashedStudyNotesFilename,
      },
    ])
    .select();
  console.log("File uploaded to supabase:", data);
  // console.log("Error:", error)

  if (error) {
    console.error("Error inserting record:", error);
  }
  // Upload file to flask server

  try {
    const response = await client.post("/gen_upload", formData);
    console.log("File uploaded and generated notes response:", response);

    if (response.status === 200) {
      window.sa_event("PDF successfull upload", {
        filename: file.name,
        fileSize,
      });
      console.log("File uploaded to flask server "); // Store the filename in the state
      const { error } = await supabase.from("study_notes").insert([
        {
          file_id: data[0].id,
          hashed_note_name: hashedStudyNotesFilename,
        },
      ]);
      if (error) {
        console.error("Error inserting record:", error);
      }
      const { errorFaiss } = await supabase.from("faiss").insert([
        {
          file_id: data[0].id,
          hashed_faiss_name: hashedFaissFilename,
        },
      ]);
      if (errorFaiss) {
        console.error("Error inserting record:", error);
      }
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

