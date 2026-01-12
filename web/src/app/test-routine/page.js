"use client";
import React, { useEffect, useState } from "react";
import CustomRoutine from "@/components/custom-routine/CustomRoutine";
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { Container, Box, Typography, LinearProgress, Paper, Fade, Button } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const ThinkingBox = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.4)',
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

export default function TestRoutine() {
  const selections = useOnboardingStore((s) => s.selections) || {};
  const generateRoutine = useOnboardingStore((s) => s.generateRoutine);
  const injectTestData = useOnboardingStore((s) => s.injectTestData);
  const resetSelections = useOnboardingStore((s) => s.resetSelections);
  const [progress, setProgress] = useState(0);
  
  const { apiRoutine, isGeneratingRoutine, thinkingText, generationError, debugLogs } = selections;

  useEffect(() => {
    // Inject test data on mount if nothing exists
    if (!apiRoutine && !isGeneratingRoutine && !selections.porosity_level) {
      console.log("Injecting test data...");
      injectTestData();
    }
  }, []);

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

  const handleManualTest = () => {
    resetSelections();
    injectTestData();
    setTimeout(() => {
      generateRoutine();
    }, 100);
  };

  return (
    <Container sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 4, textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleManualTest} sx={{ color: '#2D5A4A', borderColor: '#2D5A4A' }}>
              Reset & Start Test
          </Button>
          <Button variant="contained" onClick={() => generateRoutine()} disabled={isGeneratingRoutine} sx={{ bgcolor: '#2D5A4A', '&:hover': { bgcolor: '#1A342B' } }}>
              Trigger Generation
          </Button>
      </Box>

      {generationError && (
        <Fade in={true}>
          <Paper sx={{ p: 4, mb: 4, textAlign: 'center', borderRadius: '24px', background: 'rgba(211, 47, 47, 0.1)', border: '1px solid #d32f2f' }}>
            <Typography variant="h6" sx={{ color: '#d32f2f', mb: 1 }}>
              Generation Failed
            </Typography>
            <Typography variant="body2" sx={{ color: '#d32f2f', mb: 0 }}>
              {generationError}
            </Typography>
          </Paper>
        </Fade>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {!apiRoutine ? (
          <Fade in={true} timeout={1000}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ThinkingBox elevation={0}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  mb: 1, 
                  background: 'linear-gradient(45deg, #1A342B, #2D5A4A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  [TEST MODE] Personalizing Routine
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
                      {thinkingText || "Testing the streaming UI..."}
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
        ) : (
          <Box>
            {isGeneratingRoutine && (
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LinearProgress sx={{ width: 40, height: 4, borderRadius: 2 }} />
                <Typography variant="caption" sx={{ color: '#2D5A4A', fontWeight: 600, letterSpacing: 1 }}>
                  UPDATING RECOMMENDATIONS...
                </Typography>
              </Box>
            )}
            <CustomRoutine routine={apiRoutine} />
          </Box>
        )}
      </Box>

      {/* Debug Console */}
      <Paper sx={{ mt: 4, p: 2, bgcolor: '#1e1e1e', borderRadius: '12px', minHeight: '150px' }}>
        <Typography variant="caption" sx={{ color: '#4CAF50', fontFamily: 'monospace', mb: 1, display: 'block' }}>
          DEBUG_CONSOLE v1.0
        </Typography>
        <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
          {debugLogs?.map((log, i) => (
            <Typography key={i} variant="caption" sx={{ color: '#cccccc', fontFamily: 'monospace', display: 'block', mb: 0.5 }}>
              {'>'} {log}
            </Typography>
          ))}
          {isGeneratingRoutine && (
            <Typography variant="caption" sx={{ color: '#4CAF50', fontFamily: 'monospace', display: 'block' }}>
              _ streaming...
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
