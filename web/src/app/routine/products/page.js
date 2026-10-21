"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const DARK_GREEN = "#2D5A4A";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#FDFCF9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: DARK_GREEN,
          mb: 2,
          textAlign: "center",
        }}
      >
        Products
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          color: "#666",
          mb: 4,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        Personalized product recommendations coming soon
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: DARK_GREEN,
          color: "#fff",
          "&:hover": { bgcolor: "#265040" },
        }}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </Box>
  );
}
