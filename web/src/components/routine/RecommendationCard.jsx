"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Collapse,
  Chip,
  alpha,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";

const DARK_GREEN = "#2D5A4A";
const TYPE_COLORS = {
  environmental: "#2196F3",
  signal: "#FF6F00",
  habit: "#4CAF50",
};

export default function RecommendationCard({
  recommendation,
  onAccept,
  onDismiss,
  isLoading = false,
}) {
  const [expanded, setExpanded] = useState(false);

  const typeColor = TYPE_COLORS[recommendation.recommendation_type] || "#999";

  return (
    <Card
      sx={{
        mb: 2,
        border: `1px solid ${alpha(DARK_GREEN, 0.1)}`,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 4px 12px ${alpha(DARK_GREEN, 0.1)}`,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.5 }}>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                color: DARK_GREEN,
                flex: 1,
              }}
            >
              {recommendation.title}
            </Typography>
            <Chip
              label={recommendation.recommendation_type}
              size="small"
              sx={{
                backgroundColor: alpha(typeColor, 0.1),
                color: typeColor,
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
              }}
            />
          </Box>

          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "#555",
              mb: 1,
              lineHeight: 1.4,
            }}
          >
            {recommendation.message}
          </Typography>

          {/* Reasoning (collapsible) */}
          {recommendation.reasoning && (
            <Box>
              <Button
                onClick={() => setExpanded(!expanded)}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                }
                sx={{
                  p: 0,
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "0.8rem",
                  color: "#999",
                  "&:hover": { bgcolor: "transparent", color: "#666" },
                }}
              >
                Why this?
              </Button>
              <Collapse in={expanded}>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#999",
                    fontStyle: "italic",
                    mt: 1,
                    pl: 2,
                    borderLeft: `2px solid ${alpha(typeColor, 0.3)}`,
                  }}
                >
                  {recommendation.reasoning}
                </Typography>
              </Collapse>
            </Box>
          )}
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={
              isLoading ? <CircularProgress size={16} /> : <CheckCircleIcon />
            }
            onClick={() => onAccept(recommendation.id)}
            disabled={isLoading}
            sx={{
              bgcolor: DARK_GREEN,
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#265040" },
              "&:disabled": { opacity: 0.6 },
              minWidth: 80,
            }}
          >
            Apply
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={() => onDismiss(recommendation.id)}
            disabled={isLoading}
            sx={{
              color: DARK_GREEN,
              borderColor: alpha(DARK_GREEN, 0.3),
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { borderColor: DARK_GREEN, bgcolor: alpha(DARK_GREEN, 0.03) },
              "&:disabled": { opacity: 0.6 },
              minWidth: 80,
            }}
          >
            Dismiss
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
