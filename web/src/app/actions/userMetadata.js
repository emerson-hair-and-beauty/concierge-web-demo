"use server";

import { supabase } from "@/lib/supabase";

/**
 * Saves user metadata to Supabase.
 * @param {Object} metadata - The metadata to save.
 * @param {string} metadata.user_id - Firebase UID of the user.
 * @param {string} [metadata.first_name]
 * @param {string} [metadata.location]
 * @param {string} [metadata.hair_photo_url]
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function saveUserMetadata(metadata) {
  if (!metadata.user_id) {
    return { success: false, error: "User ID is required" };
  }

  try {
    const { error } = await supabase
      .from("user_metadata")
      .upsert({
        user_id: metadata.user_id,
        first_name: metadata.first_name,
        location: metadata.location,
        photo_url: metadata.hair_photo_url,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error("Supabase upsert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to save user metadata:", err);
    return { success: false, error: err.message };
  }
}
