"use client";
import React, { useEffect, useState } from "react";
import CustomRoutine from "@/components/custom-routine/CustomRoutine";
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
            <ThinkingBox elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.4)' }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                mb: 1, 
                background: 'linear-gradient(45deg, #1A342B, #2D5A4A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Personalizing Your Routine
              </Typography>
              
              <Box sx={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fade in={!!thinkingText} key={thinkingText} timeout={800}>
                  <Typography variant="body1" sx={{ 
                    color: '#1A342B', 
                    fontStyle: 'italic', 
                    lineHeight: 1.6,
                    maxWidth: '550px',
                    fontWeight: 500,
                    textAlign: 'center'
                  }}>
                    {thinkingText || "Analyzing your hair profile to find the perfect match..."}
                  </Typography>
                </Fade>
              </Box>

              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(45, 90, 74, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      backgroundColor: '#2D5A4A',
                      backgroundImage: 'linear-gradient(90deg, #2D5A4A 0%, #4A8B71 100%)'
                    }
                  }} 
                />
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#8BA198', letterSpacing: 1 }}>
                  ESTIMATED TIME: {Math.max(0, Math.ceil(30 - (progress * 30 / 100)))}S
                </Typography>
              </Box>
            </ThinkingBox>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
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
