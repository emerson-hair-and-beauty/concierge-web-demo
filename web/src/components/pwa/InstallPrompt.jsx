"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, alpha, Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";

const DARK_GREEN = "#2D5A4A";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("[PWA] Installation accepted");
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  return (
    <Slide direction="up" in={showPrompt} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: DARK_GREEN,
          color: "#fff",
          p: 2,
          boxShadow: "0 -2px 12px rgba(45, 90, 74, 0.2)",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <GetAppIcon sx={{ fontSize: 24 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Add Concierge to your home screen
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", opacity: 0.8 }}>
                Quick access to your personalized routines
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleInstall}
              sx={{
                bgcolor: "#fff",
                color: DARK_GREEN,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: alpha("#fff", 0.9) },
              }}
            >
              Install
            </Button>
            <IconButton
              size="small"
              onClick={handleDismiss}
              sx={{ color: "#fff" }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
}
