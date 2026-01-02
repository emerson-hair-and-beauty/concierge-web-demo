"use client";

import React from "react";
import MainNav from "@/components/navigation/MainNav";
import { Box, useTheme, useMediaQuery } from "@mui/material";

export default function RoutineLayout({ children }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ 
      display: isDesktop ? "flex" : "block", 
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden"
    }}>
      <MainNav />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: isDesktop ? `calc(100% - 80px)` : "100%",
          mb: !isDesktop ? "88px" : 0, 
          ml: isDesktop ? "80px" : 0,
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
