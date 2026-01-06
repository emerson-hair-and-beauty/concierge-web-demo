"use client";

import React, { useState } from "react";
import { 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Typography, 
  Box,
  Divider,
  alpha
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useUserData } from "@/hooks/useUserData";
import { signOutUser } from "@/config/auth";
import { useRouter } from "next/navigation";
import useOnboardingStore from "@/hooks/useOnboardingStore";

export default function UserNav() {
  const { user, isAuthenticated } = useUserData();
  const resetSelections = useOnboardingStore((s) => s.resetSelections);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await signOutUser();
      resetSelections();
      handleClose();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfile = () => {
    router.push("/routine/summary");
    handleClose();
  };

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1100 }}>
      <IconButton 
        onClick={handleOpen}
        sx={{ 
          p: 0.5,
          bgcolor: alpha("#2D5A4A", 0.1),
          "&:hover": { bgcolor: alpha("#2D5A4A", 0.2) }
        }}
      >
        <Avatar 
          src={user?.photoURL} 
          sx={{ width: 40, height: 40, bgcolor: "#2D5A4A" }}
        >
          {user?.displayName?.[0] || <PersonIcon />}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: "16px",
            minWidth: 200,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)"
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2D5A4A" }}>
            {user?.displayName || "User"}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 1, opacity: 0.5 }} />
        <MenuItem onClick={handleProfile} sx={{ py: 1.5, borderRadius: "8px", mx: 1 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile Summary
        </MenuItem>
        <MenuItem 
          onClick={handleLogout} 
          sx={{ 
            py: 1.5, 
            borderRadius: "8px", 
            mx: 1,
            color: "#d32f2f",
            "& .MuiListItemIcon-root": { color: "#d32f2f" }
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
