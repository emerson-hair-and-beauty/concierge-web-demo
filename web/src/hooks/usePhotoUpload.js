import { useState } from "react";
import { storage, auth } from "@/config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const usePhotoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const uploadPhoto = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        setError("No file selected");
        return reject("No file selected");
      }

      setUploading(true);
      setError(null);
      setProgress(0);

      // Create storage path: users/{uid}/hair_photos/{timestamp}_{filename}
      const user = auth.currentUser;
      const uid = user ? user.uid : "anonymous";
      const timestamp = Date.now();
      const storageRef = ref(storage, `users/${uid}/hair_photos/${timestamp}_${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(pct);
        },
        (err) => {
          console.error("Upload error:", err);
          setError(err.message);
          setUploading(false);
          reject(err);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadUrl);
            setUploading(false);
            resolve(downloadUrl);
          } catch (err) {
            console.error("Error getting download URL:", err);
            setError("Failed to get download URL");
            setUploading(false);
            reject(err);
          }
        }
      );
    });
  };

  const reset = () => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUrl(null);
  };

  return { uploadPhoto, uploading, progress, error, url, reset };
};
