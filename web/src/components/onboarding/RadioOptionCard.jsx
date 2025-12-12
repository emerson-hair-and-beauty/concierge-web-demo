import { Box, Icon, Typography } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
export default function RadioOptionCard({ option, isChecked = true }) {
  console.log(option);
  return (
    <Box
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 4,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: "80%",
        border: isChecked ? "1px solid #2D5A4A" : "1px solid grey",
        borderRadius: "15px",
        backgroundColor: isChecked ? "#E8F4F0" : "white",
      }}
    >
      <Box>
        <Icon>{option.icon}</Icon>
      </Box>

      <Box>
        <Typography>{option.label}</Typography>
        <Typography sx={{ color: "grey" }}>{option.description}</Typography>
      </Box>

      <Box>
        <Icon>
          {isChecked ? (
            <RadioButtonCheckedIcon sx={{ color: "#2D5A4A" }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ color: "grey" }} />
          )}
        </Icon>
      </Box>
    </Box>
  );
}
