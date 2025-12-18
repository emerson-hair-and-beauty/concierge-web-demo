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
import { calculatePorosityLevel } from "@/utils/porosityScoring";

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

// Define the custom color for consistency
const DARK_GREEN = "#2D5A4A";
const MEDIUM_GREEN = "#426A5B";
const SAGE_GREEN = "#95ABA1";
const LIGHT_BG = "#E8F4F0";

export default function ProfileSummary({
  profile = {},
  onViewRoutine = () => {},
}) {
  const theme = useTheme();
  // State is accessed using useOnboardingStore hook
  const selections = useOnboardingStore((s) => s.selections) || {};
  
  console.log(selections)

// // Combine profile props with store selections using your calculator
// const porosity = profile.porosity ?? calculatePorosityLevel(selections.hair_porosity);


const items = [
  { key: "porosity", label: "Porosity", value: selections.porosity_level, Icon: OpacityIcon },
  { key: "texture", label: "Texture", value: selections.hair_texture, Icon: WavesIcon },
  { key: "density", label: "Density", value: selections.hair_density, Icon: PeopleIcon },
  { key: "damage", label: "Damage Level", value: selections.is_damaged, Icon: FavoriteIcon },
  { key: "scalp", label: "Scalp Type", value: selections.scalp_condition, Icon: AirIcon },
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
                ${alpha(DARK_GREEN, 0.1)} 0%,
                ${LIGHT_BG} 50%,
                ${alpha(SAGE_GREEN, 0.2)} 100%
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
              bgcolor: alpha(DARK_GREEN, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AutoAwesomeIcon
              sx={{ fontSize: 40, color: DARK_GREEN }}
            />
          </Box>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ ...typographyStyles, fontWeight: 600, color: DARK_GREEN }}
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
              color: DARK_GREEN,
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
                  backgroundColor: "#FAFAFA",
                  borderRadius: 3,
                  border: 1,
                  borderColor: "rgba(0,0,0,0.05)",
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: alpha(DARK_GREEN, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* Correctly rendering the Icon component with necessary styling */}
                  <item.Icon sx={{ fontSize: 20, color: DARK_GREEN }} />
                </Box>

                {/* Text Info */}
                <Box sx={{ flex: 1 }}>
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
            bgcolor: alpha(SAGE_GREEN, 0.1),
            border: 1,
            borderColor: alpha(SAGE_GREEN, 0.3),
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              ...typographyStyles,
              mb: 1,
              color: DARK_GREEN,
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
                  <CheckIcon sx={{ fontSize: 18, color: MEDIUM_GREEN }} />
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
            backgroundColor: DARK_GREEN,
            "&:hover": {
              backgroundColor: MEDIUM_GREEN,
            },
          }}
        >
          View My Custom Routine
        </Button>
      </Box>
    </Box>
  );
}
