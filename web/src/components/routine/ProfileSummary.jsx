"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";

// Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Equivalent to Sparkles
import OpacityIcon from "@mui/icons-material/Opacity"; // Porosity
import WavesIcon from "@mui/icons-material/Waves"; // Texture
import PeopleIcon from "@mui/icons-material/People"; // Density
import FavoriteIcon from "@mui/icons-material/Favorite"; // Damage
import AirIcon from "@mui/icons-material/Air"; // Scalp
import CheckIcon from "@mui/icons-material/Check"; // For the checklist

// Assuming useOnboardingStore is defined elsewhere and returns the profile data.
// Replace with the actual path if needed.
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { typographyStyles } from "../../styles/typographyStyles";

export default function ProfileSummary({
  profile = {},
  onViewRoutine = () => {},
}) {
  const theme = useTheme();
  // State is accessed using useOnboardingStore hook
  const selections = useOnboardingStore((s) => s.selections) || {};

  // Combine profile props (highest priority) with store selections (fallback)
  const porosity = profile.porosity ?? selections.hair_porosity ?? "Unknown";
  const texture = profile.texture ?? selections.hair_texture ?? "—";
  const density = profile.density ?? selections.hair_density ?? "—";
  // The property name for damage in the store is assumed to be 'is_damaged'
  const damage = profile.damage ?? selections.is_damaged ?? "—";
  // The property name for scalp in the store is assumed to be 'scalp_condition'
  const scalp = profile.scalp ?? selections.scalp_condition ?? "—";

  const items = [
    { key: "porosity", label: "Porosity", value: porosity, Icon: OpacityIcon },
    { key: "texture", label: "Texture", value: texture, Icon: WavesIcon },
    { key: "density", label: "Density", value: density, Icon: PeopleIcon },
    { key: "damage", label: "Damage Level", value: damage, Icon: FavoriteIcon },
    { key: "scalp", label: "Scalp Type", value: scalp, Icon: AirIcon },
  ];

  console.log("ProfileSummary items:", items);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "relative",
          background: `linear-gradient(
                135deg,
                rgba(45, 90, 74, 0.1) 0%,
                #e8f4f0 50%,
                rgba(201, 107, 78, 0.1) 100%
            )`,
          pt: 8,
          pb: 6,
          px: 3,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoAwesomeIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />
          </Box>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ ...typographyStyles, fontWeight: 600 }}
        >
          Your Hair Profile Complete!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={typographyStyles}
        >
          We've analyzed your responses to create your personalized routine
        </Typography>
      </Box>
      <Box sx={{ flex: 1, px: 3, py: 4 }}>
        {/* Profile Details Card */}
        <Card
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 6,
            border: 1,
            borderColor: "divider",
            boxShadow: theme.shadows[1],
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              ...typographyStyles,
              mb: 2,
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            Your Hair Profile
          </Typography>

          <Stack spacing={2}>
            {/* Using item as the iterator name as requested */}
            {items.map((item) => (
              <Box
                key={item.key} // Using item.key for the unique identifier
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  backgroundColor: "#F6FBF9",
                  borderRadius: 3,
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* Correctly rendering the Icon component with necessary styling */}
                  <item.Icon sx={{ fontSize: 20, color: "primary.main" }} />
                </Box>

                {/* Text Info */}
                <Box sx={{ flex: 1, backgroundColor: "#F6FBF9" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={typographyStyles}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ ...typographyStyles, fontWeight: 500 }}
                  >
                    {item.value ?? "—"}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>

        {/* Benefits / What's Next Section */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.secondary.main, 0.05),
            border: 1,
            borderColor: alpha(theme.palette.secondary.main, 0.2),
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              ...typographyStyles,
              mb: 1,
              color: "secondary.main",
              fontWeight: 600,
            }}
          >
            What's Next?
          </Typography>
          <List dense disablePadding>
            {[
              "Customized product recommendations",
              "Step-by-step hair care routine",
              "Expert tips tailored to your hair type",
            ].map((text) => (
              <ListItem key={text} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon sx={{ fontSize: 18, color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                    sx: typographyStyles,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      {/* --- Footer Button --- */}
      <Box sx={{ px: 3, pb: 4 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onViewRoutine}
          sx={{
            height: 56,
            borderRadius: 2,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: theme.shadows[4],
            backgroundColor: "#2D5A4A   ",
          }}
        >
          View My Custom Routine
        </Button>
      </Box>
    </Box>
  );
}
