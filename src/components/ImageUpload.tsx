import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { FaUpload } from "react-icons/fa";

const ImageUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${user?.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref());
        setDownloadURL(url);
        setUploading(false);

        // Save image metadata to Firestore
        if (user) {
          await addDoc(collection(db, "images"), {
            userId: user.uid,
            imageUrl: url,
            timestamp: new Date(),
          });
          console.log("File available at", url);
        }
      }
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Upload Image</h2>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
        disabled={uploading}
      >
        <FaUpload className="mr-2" />
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {downloadURL && (
        <div className="mt-4">
          <p>Image Uploaded:</p>
          <img src={downloadURL} alt="Uploaded" className="w-64 h-64 object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
