import { Box, Card, Typography } from "@mui/material";
import { typographyStyles } from "../../styles/typographyStyles";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function RadioOptionCard({ option, isChecked }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: { xs: 2, md: 3 },
        gap: { xs: 2, md: 3 },
        userSelect: "none",
        borderRadius: "12px",

        backgroundColor: isChecked ? "#E8F4F0" : "white",

        border: isChecked ? "2px solid #2D5A4A" : "2px solid #e0e0e0",

        WebkitTapHighlightColor: "transparent",

        transition: "background-color 0.2s, border-color 0.2s",

        boxShadow: "none",

        "&:hover": {
          borderColor: "#2D5A4A",
          backgroundColor: isChecked ? "#E8F4F0" : "#fafafa",
        },
      }}
    >
      {/* Icon Section */}
      <Box sx={{ display: "flex", color: isChecked ? "#2D5A4A" : "grey" }}>
        {option.icon}
      </Box>

      {/* Text Section */}
      <Box sx={{ flex: 1, textAlign: "left" }}>
        <Typography
          variant="subtitle1"
          sx={{
            ...typographyStyles,
            fontWeight: 600,
            color: isChecked ? "#2D5A4A" : "text.primary",
          }}
        >
          {option.label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...typographyStyles,
            color: "text.secondary",
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
          }}
        >
          {option.description}
        </Typography>
      </Box>

      {/* Radio Button Section */}
      <Box sx={{ display: "flex" }}>
        {isChecked ? (
          <RadioButtonCheckedIcon sx={{ color: "#2D5A4A" }} />
        ) : (
          <RadioButtonUncheckedIcon sx={{ color: "grey" }} />
        )}
      </Box>
    </Card>
  );
}
