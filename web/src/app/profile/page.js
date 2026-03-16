"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Chip,
  alpha,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import GrainOutlinedIcon from "@mui/icons-material/GrainOutlined";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { HUMIDITY_RESPONSE_OPTIONS, HAIR_GOALS_OPTIONS } from "@/constants/onboardingData";

const DARK_GREEN = "#2D5A4A";
const SAGE = "#95ABA1";
const LIGHT_BG = "#FDFCF9";
const SAND_GOLD = "#FFD97B";
const CARD_BG = "#F4F9F7";

// Map stored values to display-friendly labels
function getHumidityLabel(val) {
  if (!val) return null;
  // Could be stored as label or value
  const found = HUMIDITY_RESPONSE_OPTIONS.find(
    (o) => o.value === val || o.label === val
  );
  if (found) {
    if (found.value === "frizzy") return "Humidity sensitive (frizz)";
    if (found.value === "lose_definition") return "Humidity sensitive (loss of definition)";
    if (found.value === "stable") return "Humidity stable";
  }
  return val;
}

function getGoalsLabel(goals) {
  if (!goals || goals.length === 0) return null;
  const map = Object.fromEntries(HAIR_GOALS_OPTIONS.map((g) => [g.value, g.label]));
  return goals.map((g) => map[g] || g).join(" + ");
}

function getMoistureLabel(porosity) {
  if (!porosity) return null;
  // Quick heuristic from the porosity questions
  const q2 = porosity.q2;
  const q3 = porosity.q3;
  const q4 = porosity.q4;
  let highCount = 0;
  let lowCount = 0;
  if (q2 === "quickly" || q2 === "Very quickly") highCount++;
  if (q2 === "slowly" || q2 === "Slowly") lowCount++;
  if (q3 === "quickly" || q3 === "Very quickly") highCount++;
  if (q3 === "slowly" || q3 === "A long time") lowCount++;
  if (q4 === "yes" || q4 === "They absorb very quickly") highCount++;
  if (q4 === "no" || q4 === "They sit on the surface") lowCount++;
  if (highCount > lowCount) return "High porosity (fast absorbing)";
  if (lowCount > highCount) return "Low porosity (resistant to moisture)";
  return "Normal porosity (balanced)";
}

// Individual profile row
function ProfileRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          bgcolor: alpha(DARK_GREEN, 0.08),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: DARK_GREEN,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 700,
            color: SAGE,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            color: DARK_GREEN,
            lineHeight: 1.4,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const selections = useOnboardingStore((s) => s.selections) || {};

  const firstName = selections.first_name || "Your";
  const texture = selections.hair_texture;
  const density = selections.hair_density || null;
  const humidity = getHumidityLabel(selections.humidity_response);
  const goals = getGoalsLabel(selections.hair_goals);
  const moisture = getMoistureLabel(selections.hair_porosity);

  const profileRows = [
    { icon: <GrainOutlinedIcon sx={{ fontSize: 20 }} />, label: "Texture", value: texture },
    { icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />, label: "Density", value: density },
    { icon: <WaterDropOutlinedIcon sx={{ fontSize: 20 }} />, label: "Moisture behaviour", value: moisture },
    { icon: <AirOutlinedIcon sx={{ fontSize: 20 }} />, label: "Humidity response", value: humidity },
    { icon: <FavoriteOutlinedIcon sx={{ fontSize: 20 }} />, label: "Focus", value: goals },
  ];

  return (
    <Box
      sx={{
        minHeight: ["100vh", "100dvh"],
        bgcolor: LIGHT_BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2.5, sm: 4, md: 6 },
        py: { xs: 4, md: 6 },
        overflowY: "auto",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 540 }}>
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              fontSize: "0.75rem",
              color: SAGE,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            EMERSON
          </Typography>

          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important", color: `${DARK_GREEN} !important` }} />}
            label="Your curl profile is ready"
            sx={{
              bgcolor: alpha(DARK_GREEN, 0.07),
              color: DARK_GREEN,
              fontWeight: 700,
              fontSize: "0.8rem",
              mb: 2.5,
              height: 32,
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 800,
              color: DARK_GREEN,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              mb: 0.5,
            }}
          >
            {firstName}'s
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 400,
              fontStyle: "italic",
              color: SAGE,
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            Curl Profile
          </Typography>
        </Box>

        {/* Profile card */}
        <Box
          sx={{
            bgcolor: CARD_BG,
            borderRadius: "20px",
            border: "1px solid",
            borderColor: alpha(DARK_GREEN, 0.08),
            px: { xs: 3, md: 4 },
            py: 1,
            mb: 4,
          }}
        >
          {profileRows.map((row, i) => (
            <React.Fragment key={row.label}>
              <ProfileRow {...row} />
              {i < profileRows.length - 1 && (
                <Divider sx={{ borderColor: alpha(DARK_GREEN, 0.06) }} />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Inside the Concierge teaser */}
        <Box
          sx={{
            bgcolor: DARK_GREEN,
            borderRadius: "20px",
            px: { xs: 3, md: 4 },
            py: 3,
            mb: 4,
            color: "#FFF",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: SAND_GOLD,
              mb: 1.5,
            }}
          >
            Inside the Curl Concierge
          </Typography>
          <Stack spacing={1.25}>
            {[
              "Track your wash days",
              "Discover routines suited to GCC humidity",
              "Learn which products work best for your texture",
            ].map((item) => (
              <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    bgcolor: SAND_GOLD,
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* CTAs */}
        <Stack spacing={1.5}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => router.push("/routine")}
            sx={{
              bgcolor: DARK_GREEN,
              color: "#FFF",
              borderRadius: "14px",
              py: 1.8,
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 6px 24px rgba(45,90,74,0.25)",
              "&:hover": {
                bgcolor: "#265040",
                transform: "translateY(-1px)",
                boxShadow: "0 8px 28px rgba(45,90,74,0.3)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Recommended Curl Routine
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => router.push("/routine/summary")}
            sx={{
              color: DARK_GREEN,
              borderColor: alpha(DARK_GREEN, 0.25),
              borderRadius: "14px",
              py: 1.6,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              "&:hover": {
                borderColor: DARK_GREEN,
                bgcolor: alpha(DARK_GREEN, 0.03),
              },
            }}
          >
            Log Wash Day
          </Button>
        </Stack>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.72rem",
            color: alpha(DARK_GREEN, 0.3),
            mt: 4,
            mb: 2,
          }}
        >
          © {new Date().getFullYear()} Emerson Hair & Beauty
        </Typography>
      </Box>
    </Box>
  );
}
