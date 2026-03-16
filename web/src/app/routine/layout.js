"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import UserNav from "@/components/navigation/UserNav";
import TopNav from "@/components/navigation/TopNav";
import ExperienceChat from "@/components/routine/ExperienceChat";
import { useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";
import { updateUserLocation } from "@/utils/telemetry";

export default function RoutineLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useUserData();

  useEffect(() => {
    const trackLocation = async () => {
      if (!user?.uid) return;
      
      // Check if we've already tracked location this session to avoid redundant calls
      const lastTracked = sessionStorage.getItem(`last_location_sync_${user.uid}`);
      const oneHour = 60 * 60 * 1000;
      
      if (lastTracked && (Date.now() - parseInt(lastTracked)) < oneHour) {
        return;
      }

      try {
        // Use ipapi.co for passive city detection
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        
        if (data.city && data.region) {
          const locationString = `${data.city}, ${data.region}`;
          await updateUserLocation(user.uid, locationString);
          sessionStorage.setItem(`last_location_sync_${user.uid}`, Date.now().toString());
        }
      } catch (error) {
        console.error("Location tracking failed:", error);
      }
    };

    trackLocation();
  }, [user?.uid]);

  return (
    <Box sx={{ 
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden",
      bgcolor: "#FDFCF9"
    }}>
      <UserNav />
      <TopNav />
      
      <Box 
        component="main" 
        sx={{ 
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          pt: 8, // Reduced space for top nav
          pb: 4
        }}
      >
        {children}
      </Box>

      {/* Global Experience Chat managed by Layout and Nav */}
      <ExperienceChat 
        isOpenExternal={isChatOpen} 
        onCloseExternal={() => setIsChatOpen(false)} 
        onOpenExternal={() => setIsChatOpen(true)}
      />
    </Box>
  );
}
