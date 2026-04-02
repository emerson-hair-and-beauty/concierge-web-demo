import React, { useEffect, useRef } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const TerminalContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1e1e1e",
  color: "#cccccc",
  fontFamily: "'Courier New', Courier, monospace",
  padding: "20px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "700px",
  minHeight: "300px",
  maxHeight: "500px",
  overflowY: "auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  border: "1px solid #333",
  zIndex: 10,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#333",
    borderRadius: "4px",
  },
}));

const Prompt = styled("span")({
  color: "#4CAF50",
  marginRight: "8px",
});

const Cursor = styled("span")({
  display: "inline-block",
  width: "8px",
  height: "15px",
  backgroundColor: "#4CAF50",
  marginLeft: "5px",
  animation: "blink 1s infinite steps(1)",
  verticalAlign: "middle",
  "@keyframes blink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 },
  },
});

const TerminalUI = ({ logs = [], currentThinking = "" }) => {
  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, currentThinking]);

  return (
    <TerminalContainer elevation={10}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", borderBottom: "1px solid #333", pb: 1, opacity: 0.7 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ff5f56", mr: 1 }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#ffbd2e", mr: 1 }} />
        <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#27c93f", mr: 1 }} />
        <Typography variant="caption" sx={{ ml: 2, letterSpacing: 1, fontWeight: 700 }}>
          EMERSON_ORCHESTRATOR v2.4
        </Typography>
      </Box>

      {logs.map((log, index) => (
        <Box key={index} sx={{ mb: 1.5, display: "flex", alignItems: "flex-start" }}>
          <Prompt>{">"}</Prompt>
          <Typography 
            variant="body2" 
            sx={{ 
                fontFamily: "monospace", 
                fontSize: "0.9rem", 
                lineHeight: 1.5,
                color: log.includes("Error") ? "#ff5f56" : "#cccccc"
            }}
          >
            {log}
          </Typography>
        </Box>
      ))}

      {currentThinking && (
        <Box sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
          <Prompt>{">"}</Prompt>
          <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#4CAF50", fontStyle: "italic", lineHeight: 1.5 }}>
            {currentThinking}
            <Cursor />
          </Typography>
        </Box>
      )}

      {logs.length === 0 && !currentThinking && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Prompt>{">"}</Prompt>
          <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
            Connecting to orchestrator...
            <Cursor />
          </Typography>
        </Box>
      )}
      
      <div ref={terminalEndRef} />
    </TerminalContainer>
  );
};

export default TerminalUI;
