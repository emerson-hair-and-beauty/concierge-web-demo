"use client";

import React from "react";
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Typography,
  Tooltip,
  IconButton,
  alpha
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import PersonIcon from "@mui/icons-material/Person";
import { typographyStyles } from "@/styles/typographyStyles";

const NAV_ITEMS = [
  { label: "Routine", icon: <AssignmentIcon />, path: "/routine/result" },
  { label: "Products", icon: <ShoppingBagIcon />, path: "/routine/products" },
  { label: "Journey", icon: <AutoGraphIcon />, path: "/routine/the-journey" },
  { label: "Profile", icon: <PersonIcon />, path: "/routine/summary" },
];

export default function MainNav() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const activeIndex = NAV_ITEMS.findIndex(item => pathname === item.path);

  const handleNavigate = (path) => {
    router.push(path);
  };

  if (isMobile) {
    return (
      <Paper 
        sx={{ 
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)"
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={activeIndex === -1 ? 0 : activeIndex}
          sx={{ height: 72, background: "transparent" }}
        >
          {NAV_ITEMS.map((item, index) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={item.icon}
              onClick={() => handleNavigate(item.path)}
              sx={{
                color: "#888",
                "&.Mui-selected": {
                  color: "#2D5A4A",
                },
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  mt: 0.5,
                  ...typographyStyles
                }
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        width: 80,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        zIndex: 1000
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800, 
            color: "#2D5A4A", 
            letterSpacing: -1,
            fontSize: "1.5rem"
          }}
        >
          E.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Tooltip key={item.path} title={item.label} placement="right">
              <IconButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "16px",
                  color: isActive ? "#FFF" : "#888",
                  bgcolor: isActive ? "#2D5A4A" : "transparent",
                  "&:hover": {
                    bgcolor: isActive ? "#2D5A4A" : alpha("#2D5A4A", 0.1),
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
