"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function RoutineRoot() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/routine/choose");
  }, [router]);

  return (
    <Box sx={{ 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <CircularProgress sx={{ color: "#2D5A4A" }} />
    </Box>
  );
}
