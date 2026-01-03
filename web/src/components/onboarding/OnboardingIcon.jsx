"use client";

import React from "react";
import { Box, alpha } from "@mui/material";

const GLASS_STYLE = {
  background: "rgba(255, 255, 255, 0.45)",
  backdropFilter: "blur(8px) saturate(180%)",
  WebkitBackdropFilter: "blur(8px) saturate(180%)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
};

const FloatingAnimation = {
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-6px)" },
    "100%": { transform: "translateY(0px)" },
  },
  animation: "float 4s ease-in-out infinite",
};

const COLOR_MAP = {
  // Density: Yellow/Orange
  density_thin: "#FFD97B",
  density_medium: "#FFB03B",
  density_thick: "#FF8C00",
  // Texture: Blue/Purple
  texture_straight: "#4FC3F7",
  texture_wavy: "#7986CB",
  texture_curly: "#9575CD",
  texture_coily: "#4DB6AC",
  // Damage: Red/Pink
  check_solid: "#4CAF50", // Positive/Healthy
  check_damaged: "#FF5252", // Critical/Damaged
  // Porosity: Indigo/Deep Orange
  porosity_smooth: "#81C784",
  porosity_wiry: "#FF8A65",
  porosity_rough: "#A1887F",
  porosity_slow: "#64B5F6",
  porosity_med: "#BA68C8",
  porosity_fast: "#FFD54F",
  // Scalp: Teal, Orange, Sage, Pink
  scalp_oily: "#4DB6AC",
  scalp_dry: "#FF8A65",
  scalp_normal: "#81C784",
  scalp_sensitive: "#F06292",
  // Fallback
  default: "#95ABA1",
};

export default function OnboardingIcon({ type, isChecked }) {
  const baseColor = COLOR_MAP[type] || COLOR_MAP.default;
  
  const glassStyle = {
    ...GLASS_STYLE,
    background: isChecked ? alpha(baseColor, 0.15) : "rgba(255, 255, 255, 0.45)",
    borderColor: isChecked ? alpha(baseColor, 0.4) : alpha(baseColor, 0.2),
    boxShadow: isChecked 
      ? `0 8px 32px 0 ${alpha(baseColor, 0.2)}` 
      : `0 4px 15px ${alpha(baseColor, 0.05)}`,
  };

  const renderShape = () => {
    switch (type) {
      // SCALP
      case "scalp_oily":
        return (
          <Box
            sx={{
              ...glassStyle,
              width: 38,
              height: 38,
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              bgcolor: alpha(baseColor, 0.3),
              borderWidth: 2,
            }}
          />
        );
      case "scalp_dry":
        return (
          <Box
            sx={{
              ...glassStyle,
              width: 35,
              height: 35,
              transform: "rotate(45deg)",
              bgcolor: alpha(baseColor, 0.2),
              border: `2.5px solid ${alpha(baseColor, 0.6)}`,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -4,
                right: -4,
                width: 10,
                height: 10,
                bgcolor: baseColor,
                borderRadius: "2px",
              }
            }}
          />
        );
      case "scalp_normal":
        return (
          <Box
            sx={{
              ...glassStyle,
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: alpha(baseColor, 0.25),
              boxShadow: `inset 0 0 15px ${alpha(baseColor, 0.3)}`,
            }}
          />
        );
      case "scalp_sensitive":
        return (
          <Box sx={{ position: "relative", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ ...glassStyle, width: 30, height: 30, borderRadius: "50%", border: `3px solid ${baseColor}`, zIndex: 2 }} />
            <Box sx={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", border: `1px dashed ${alpha(baseColor, 0.4)}` }} />
          </Box>
        );

      // DENSITY
      case "density_thin":
        return (
          <Box sx={{ ...glassStyle, width: 8, height: 40, bgcolor: alpha(baseColor, 0.4) }} />
        );
      case "density_medium":
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box sx={{ ...glassStyle, width: 8, height: 30, bgcolor: alpha(baseColor, 0.3) }} />
            <Box sx={{ ...glassStyle, width: 8, height: 45, bgcolor: alpha(baseColor, 0.5) }} />
            <Box sx={{ ...glassStyle, width: 8, height: 30, bgcolor: alpha(baseColor, 0.3) }} />
          </Box>
        );
      case "density_thick":
        return (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
            {[...Array(6)].map((_, i) => (
              <Box key={i} sx={{ ...glassStyle, width: 8, height: i % 2 === 0 ? 35 : 25, bgcolor: alpha(baseColor, 0.4) }} />
            ))}
          </Box>
        );

      // TEXTURE
      case "texture_straight":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
             <Box sx={{ ...glassStyle, width: 40, height: 4, borderRadius: 2, bgcolor: alpha(baseColor, 0.6) }} />
             <Box sx={{ ...glassStyle, width: 30, height: 4, borderRadius: 2, bgcolor: alpha(baseColor, 0.3) }} />
          </Box>
        );
      case "texture_wavy":
        return (
          <Box
            component="svg"
            width="50"
            height="30"
            viewBox="0 0 50 30"
            sx={{ filter: `drop-shadow(0 2px 4px ${alpha(baseColor, 0.2)})` }}
          >
            <path
              d="M0 15 Q12.5 0 25 15 T50 15"
              fill="none"
              stroke={baseColor}
              strokeWidth="4"
              strokeLinecap="round"
              style={{ opacity: 0.8 }}
            />
          </Box>
        );
      case "texture_curly":
        return (
          <Box
             sx={{
               ...glassStyle,
               width: 36,
               height: 36,
               borderRadius: "50%",
               borderWidth: 4,
               borderColor: baseColor,
               background: "transparent",
             }}
          />
        );
      case "texture_coily":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  ...glassStyle,
                  width: 30,
                  height: 12,
                  borderRadius: "50%",
                  mt: -0.5,
                  border: `2px solid ${baseColor}`,
                  bgcolor: alpha(baseColor, 0.1),
                }}
              />
            ))}
          </Box>
        );

      // DAMAGE / SCALP / POROSITY GENERAL
      case "check_solid":
      case "porosity_slow":
        return (
          <Box
            sx={{
              ...glassStyle,
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(baseColor, 0.2),
            }}
          >
             <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: baseColor, boxShadow: `0 0 10px ${alpha(baseColor, 0.5)}` }} />
          </Box>
        );
      case "check_damaged":
      case "porosity_fast":
        return (
          <Box sx={{ position: "relative", width: 40, height: 40 }}>
             <Box sx={{ ...glassStyle, width: 25, height: 25, borderRadius: 1, position: "absolute", top: 0, left: 0, transform: "rotate(-15deg)", bgcolor: alpha(baseColor, 0.3) }} />
             <Box sx={{ ...glassStyle, width: 25, height: 25, borderRadius: 1, position: "absolute", bottom: 0, right: 0, transform: "rotate(20deg)", border: `1.5px solid ${baseColor}`, bgcolor: alpha(baseColor, 0.1) }} />
          </Box>
        );

      // POROSITY SPECIFIC
      case "porosity_smooth":
      case "porosity_med":
        return <Box sx={{ ...glassStyle, width: 45, height: 20, borderRadius: 10, bgcolor: alpha(baseColor, 0.4) }} />;
      
      case "porosity_wiry":
        return (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={{ ...glassStyle, width: 6, height: 30, transform: `skewY(${i % 2 === 0 ? '-10deg' : '10deg'})`, bgcolor: alpha(baseColor, 0.4) }} />
            ))}
          </Box>
        );
      case "porosity_rough":
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", width: 40, gap: 0.5 }}>
            {[...Array(4)].map((_, i) => (
               <Box key={i} sx={{ ...glassStyle, width: 15, height: 15, borderRadius: 1, bgcolor: alpha(baseColor, 0.2), border: `1px solid ${alpha(baseColor, 0.5)}` }} />
            ))}
          </Box>
        );
      
      default:
        // Default generic glass sphere
        return <Box sx={{ ...glassStyle, width: 40, height: 40, borderRadius: "50%" }} />;
    }
  };

  return (
    <Box sx={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      ...FloatingAnimation
    }}>
      {renderShape()}
    </Box>
  );
}
