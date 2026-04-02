import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { uploadImageAction } from "@/app/actions/imageUpload";
import { saveUserMetadata } from "@/app/actions/userMetadata";
import { auth } from "@/config/firebase";
import { typographyStyles } from "../../styles/typographyStyles";

const DARK_GREEN = "#2D5A4A";
const SAGE = "#95ABA1";
const LIGHT_BG = "#FDFCF9";

const PhotoUploadStep = () => {
  const setSelection = useOnboardingStore((s) => s.setSelection);
  const photoUrl = useOnboardingStore((s) => s.selections.hair_photo_url);
  const fileInputRef = useRef(null);
  
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("file", file);
        
        const result = await uploadImageAction(formData);
        
        if (result.success) {
          setSelection("hair_photo_url", result.url);
          
          // Sync with Supabase Metadata
          const user = auth.currentUser;
          if (user) {
            const { selections } = useOnboardingStore.getState();
            await saveUserMetadata({
              user_id: user.uid,
              first_name: selections.first_name,
              location: selections.location,
              hair_photo_url: result.url,
            });
          }
        } else {
          setError(result.error || "Upload failed");
        }
      } catch (err) {
        console.error("Upload failed", err);
        setError("An unexpected error occurred during upload");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setSelection("hair_photo_url", null);
  };

  return (
    <Box sx={{ textAlign: "center", py: 4, px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          ...typographyStyles,
          fontWeight: 800,
          color: DARK_GREEN,
          mb: 2,
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        Show us your curls
      </Typography>
      
      <Typography
        sx={{
          ...typographyStyles,
          color: SAGE,
          mb: 6,
          fontSize: { xs: "0.95rem", md: "1.1rem" },
          maxWidth: "500px",
          mx: "auto",
        }}
      >
        Upload a clear photo of your hair. This helps us better understand your curl pattern and density (optional).
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          mx: "auto",
          p: 2,
        }}
      >
        {photoUrl ? (
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={photoUrl}
              alt="Hair Preview"
              sx={{
                width: "100%",
                height: "auto",
                aspectRatio: "3/4",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              }}
            />
            <IconButton
              onClick={handleRemove}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "white",
                color: DARK_GREEN,
                "&:hover": { bgcolor: "#f0f0f0" },
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: "100%",
              height: "400px",
              border: `2px dashed ${SAGE}`,
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(149, 171, 161, 0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(149, 171, 161, 0.1)",
                borderColor: DARK_GREEN,
              },
            }}
          >
            {uploading ? (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress
                  sx={{ color: DARK_GREEN, mb: 2 }}
                />
                <Typography sx={{ color: DARK_GREEN, fontWeight: 600 }}>
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 40, color: DARK_GREEN }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: DARK_GREEN,
                    mb: 1,
                  }}
                >
                  Click to scan or upload
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: SAGE, opacity: 0.8 }}
                >
                  JPG, PNG or GIF (max 10MB)
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {error && (
        <Typography sx={{ color: "error.main", mt: 2, fontSize: "0.85rem" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoUploadStep;
