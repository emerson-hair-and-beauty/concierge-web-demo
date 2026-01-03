"use client";

import React from "react";
import MainNav from "@/components/navigation/MainNav";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";

export default function RoutineLayout({ children }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { isAuthenticated } = useUserData();

  // Hide MainNav on the summary screen if not authenticated
  const showNav = !(pathname === "/routine/summary" && !isAuthenticated);

  return (
    <Box sx={{ 
      display: isDesktop && showNav ? "flex" : "block", 
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      overflowX: "hidden"
    }}>
      {showNav && <MainNav />}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: isDesktop && showNav ? `calc(100% - 80px)` : "100%",
          mb: !isDesktop && showNav ? "88px" : 0, 
          ml: isDesktop && showNav ? "80px" : 0,
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
