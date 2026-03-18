"use server";

/**
 * Server action to sync user profile data to Klaviyo.
 * This runs securely on the server, so we can use the Private API Key.
 */
export async function syncToKlaviyo(profileData) {
  // Support both KLAVIYO_PRIVATE_KEY and KLAVIYO_PRIVATE_API_KEY
  const privateKey = process.env.KLAVIYO_PRIVATE_API_KEY || process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!privateKey) {
    console.error("Klaviyo API Key is missing from environment variables.");
    return { success: false, error: "Configuration error" };
  }

  const {
    email,
    first_name,
    country,
    gender,
    hair_length,
    hair_texture,
    hair_density,
    porosity_level,
    humidity_response,
    hair_goals,
    hair_photo_url,
  } = profileData;

  const headers = {
    Authorization: `Klaviyo-API-Key ${privateKey}`,
    accept: "application/vnd.api+json",
    "content-type": "application/vnd.api+json",
    revision: "2024-02-15",
  };

  let profileId = null;

  // 1. Create or Update Profile in Klaviyo
  try {
    const profileResponse = await fetch("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: email,
            first_name: first_name,
            properties: {
              Country: country,
              Gender: gender,
              "Hair Length": hair_length,
              "Curl Pattern": hair_texture,
              "Hair Density": hair_density,
              "Moisture Behaviour": porosity_level,
              "Humidity Response": humidity_response,
              "Hair Goals": hair_goals,
              "Hair Photo": hair_photo_url,
            },
          },
        },
      }),
    });

    const profileJson = await profileResponse.json();

    if (profileResponse.ok) {
      profileId = profileJson.data?.id;
    } else if (profileResponse.status === 409) {
      // Profile already exists, fetch the ID by searching for the email
      console.log(`Profile with email ${email} already exists. Fetching ID...`);
      const searchResponse = await fetch(`https://a.klaviyo.com/api/profiles/?filter=equals(email,"${email}")`, {
        method: "GET",
        headers,
      });
      const searchJson = await searchResponse.json();
      profileId = searchJson.data?.[0]?.id;
      
      // Also update the existing profile with the new hair data
      if (profileId) {
        await fetch(`https://a.klaviyo.com/api/profiles/${profileId}/`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            data: {
              type: "profile",
              id: profileId,
              attributes: {
                properties: {
                  Country: country,
                  Gender: gender,
                  "Hair Length": hair_length,
                  "Curl Pattern": hair_texture,
                  "Hair Density": hair_density,
                  "Moisture Behaviour": porosity_level,
                  "Humidity Response": humidity_response,
                  "Hair Goals": hair_goals,
                  "Hair Photo": hair_photo_url,
                },
              },
            },
          }),
        });
      }
    } else {
      console.error("Klaviyo Profile API error:", profileJson);
      throw new Error(profileJson.errors?.[0]?.detail || "Failed to sync profile");
    }

    // 2. Add to List if listId is provided
    if (listId && profileId) {
      const listResponse = await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: [{ type: "profile", id: profileId }],
        }),
      });

      if (!listResponse.ok) {
        const listJson = await listResponse.json();
        // If profile is already in the list, Klaviyo returns a conflict, which is fine
        if (listResponse.status !== 409) {
          console.warn("Klaviyo List API warning:", listJson);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Sync to Klaviyo failed:", error);
    return { success: false, error: error.message };
  }
}

