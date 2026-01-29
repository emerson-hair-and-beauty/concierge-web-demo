"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import UserNav from "@/components/navigation/UserNav";
import TopNav from "@/components/navigation/TopNav";
import ExperienceChat from "@/components/routine/ExperienceChat";

export default function RoutineLayout({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
