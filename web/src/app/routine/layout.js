"use client";

import React from "react";
import { Box } from "@mui/material";
import UserNav from "@/components/navigation/UserNav";

export default function RoutineLayout({ children }) {
  return (
    <Box sx={{ 
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden",
      bgcolor: "#FDFCF9"
    }}>
      <UserNav />
      <Box 
        component="main" 
        sx={{ 
          width: "100%",
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
