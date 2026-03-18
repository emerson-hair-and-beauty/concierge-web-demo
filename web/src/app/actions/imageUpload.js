"use server";

import cloudinary from "@/lib/cloudinary";

/**
 * Server Action to upload an image to Cloudinary.
 * @param {FormData} formData - Contains the file to upload.
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadImageAction(formData) {
  const file = formData.get("file");

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "hair_photos",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            resolve({ success: false, error: error.message });
          } else {
            resolve({ success: true, url: result.secure_url });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Server Action upload error:", error);
    return { success: false, error: error.message };
  }
}
