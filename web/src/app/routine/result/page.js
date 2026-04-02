"use client";
import React, { useEffect, useState } from "react";
import CustomRoutine from "@/components/custom-routine/CustomRoutine";
import ExperienceChat from "@/components/routine/ExperienceChat";
import TerminalUI from "@/components/onboarding/TerminalUI";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container, Box, Typography, LinearProgress, Paper, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const ThinkingBox = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  padding: '40px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 12px 40px 0 rgba(45, 90, 74, 0.15)',
  color: '#2D5A4A',
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
  textAlign: 'center',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
  animation: `${pulse} 3s infinite ease-in-out`,
}));

export default function RoutineResult() {
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);
  const [progress, setProgress] = useState(0);
  
  const { apiRoutine, isGeneratingRoutine, thinkingText, generationError } = selections;

  useEffect(() => {
    console.log("RoutineResult State Update:", { isGeneratingRoutine, thinkingText: thinkingText?.length, hasRoutine: !!apiRoutine, error: generationError });
  }, [isGeneratingRoutine, thinkingText, apiRoutine, generationError]);

  useEffect(() => {
    // If we're here and not generating, don't have a routine, AND no error, start it
    if (!apiRoutine && !isGeneratingRoutine && !generationError) {
      console.log("Starting routine generation...");
      generateRoutine();
    }
  }, [apiRoutine, isGeneratingRoutine, generateRoutine, generationError]);

  useEffect(() => {
    let timer;
    if (isGeneratingRoutine) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / 300);
        });
      }, 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [isGeneratingRoutine]);

  if (generationError) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '24px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(10px)' }}>
          <Typography variant="h6" sx={{ color: '#d32f2f', mb: 2 }}>
            Something went wrong
          </Typography>
          <Typography variant="body1" sx={{ color: '#4A6B5F', mb: 4 }}>
            {generationError}
          </Typography>
          <Box
            component="button"
            onClick={() => generateRoutine()}
            sx={{
              background: '#2D5A4A',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              '&:hover': { background: '#1A342B' }
            }}
          >
            Try Again
          </Box>
        </Paper>
      </Container>
    );
  }

  if (!apiRoutine && !generationError) {
    return (
      <Container sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '85vh',
        background: 'radial-gradient(circle at top right, rgba(45, 90, 74, 0.05), transparent), radial-gradient(circle at bottom left, rgba(45, 90, 74, 0.05), transparent)'
      }}>
        <Fade in={true} timeout={1000}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 800, 
                    mb: 1, 
                    color: '#2D5A4A',
                    letterSpacing: '-0.02em',
                }}>
                    Building your routine...
                </Typography>
                <Typography variant="body1" sx={{ color: '#8BA198', maxWidth: '600px', mx: 'auto' }}>
                    Hold tight. Our AI is analyzing your curls, checking the local weather in {selections.location}, and searching for the perfect products for you.
                </Typography>
            </Box>

            <TerminalUI 
                logs={selections.debugLogs || []} 
                currentThinking={thinkingText} 
            />

            <Box sx={{ width: '100%', maxWidth: '700px', mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: 'rgba(45, 90, 74, 0.1)',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: '#2D5A4A',
                    }
                }} 
              />
              <Typography variant="caption" sx={{ mt: 1.5, display: 'block', color: '#8BA198', letterSpacing: 2, textAlign: 'center', fontWeight: 600 }}>
                  ESTIMATED TIME REMAINING: {Math.max(0, Math.ceil(30 - (progress * 30 / 100)))}S
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, pb: 8 }}>
      {isGeneratingRoutine && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <LinearProgress sx={{ width: 40, height: 4, borderRadius: 2 }} />
          <Typography variant="caption" sx={{ color: '#2D5A4A', fontWeight: 600, letterSpacing: 1 }}>
            UPDATING RECOMMENDATIONS...
          </Typography>
        </Box>
      )}
      <CustomRoutine routine={apiRoutine} />
    </Container>
  );
}
