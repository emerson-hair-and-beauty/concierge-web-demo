"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  Stack, 
  Avatar, 
  LinearProgress, 
  Chip,
  IconButton,
  Divider,
  Fade,
  alpha,
  Button
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudIcon from '@mui/icons-material/Cloud';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlareIcon from '@mui/icons-material/Flare';
import DoneIcon from '@mui/icons-material/Done';
import useOnboardingStore from "@/hooks/useOnboardingStore";
import { useUserData } from "@/hooks/useUserData";
import { typographyStyles } from "@/styles/typographyStyles";
import { useRouter } from "next/navigation";

const DARK_GREEN = "#2D5A4A";
const MEDIUM_GREEN = "#426A5B";

const BentoCard = ({ title, icon: Icon, children, sx = {}, height = '100%', action }) => (
  <Card
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 7,
      border: "1px solid rgba(255, 255, 255, 0.45)",
      height: height,
      background: 'rgba(255, 255, 255, 0.55)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(45, 90, 74, 0.03), inset 0 0 16px rgba(255, 255, 255, 0.6)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 24px rgba(45, 90, 74, 0.06)',
      },
      ...sx
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
        <Avatar sx={{ bgcolor: alpha(DARK_GREEN, 0.08), color: DARK_GREEN, width: 28, height: 28 }}>
          <Icon sx={{ fontSize: 16 }} />
        </Avatar>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: DARK_GREEN, letterSpacing: -0.1, fontSize: '0.8rem' }}>
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
  </Card>
);

export default function JourneyDashboard() {
  const router = useRouter();
  const { selections } = useOnboardingStore();
  const { user } = useUserData();
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      setIsLoadingHistory(true);
      fetch(`/api/diagnostic/history/${user.uid}`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) setHistory(data.slice(0, 5));
        })
        .finally(() => setIsLoadingHistory(false));
    }
  }, [user?.uid]);

  const porosity = selections.porosity_level || 'Normal';
  
  // Dynamic Weather Advice
  const weatherAdvice = {
    'High': "High humidity detected. Low porosity hair might frizz; use a light sealing oil.",
    'Low': "Dry air warning. Mist your hair lightly before applying moisturizer.",
    'Normal': "Mild conditions today. Stick to your standard routine steps."
  };

  const products = selections.apiRoutine?.steps.reduce((acc, step) => {
    if (step.products) acc.push(...step.products);
    return acc;
  }, []) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2, pb: 12 }}>
      <Fade in timeout={800}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ ...typographyStyles, fontWeight: 700, color: DARK_GREEN, letterSpacing: -0.2 }}>
                Journal
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 1, opacity: 0.6 }}>
                COMMAND CENTER
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {/* 1. ROUTINE SUMMARY (Compact List) */}
            <Grid item size={{ xs: 12, md: 7 }}>
              <BentoCard 
                title="Active Routine" 
                icon={AssignmentIcon}
                action={
                  <IconButton 
                    size="small" 
                    onClick={() => router.push('/routine/result')}
                    sx={{ color: DARK_GREEN, p: 0 }}
                  >
                    <ArrowBackIcon sx={{ fontSize: 18, transform: 'rotate(180deg)' }} />
                  </IconButton>
                }
              >
                <Stack spacing={1} sx={{ px: 0.5 }}>
                  {(selections.apiRoutine?.steps || []).map((step, i) => (
                    <Box key={i} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5,
                      py: 0.5
                    }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 700, 
                        color: DARK_GREEN, 
                        opacity: 0.3,
                        minWidth: 16,
                        fontSize: '0.65rem'
                      }}>
                        0{i+1}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        fontWeight: 600, 
                        color: DARK_GREEN,
                        fontSize: '0.75rem',
                        letterSpacing: -0.1
                      }}>
                        {step.title}
                      </Typography>
                    </Box>
                  ))}
                  {!selections.apiRoutine && (
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>Preparing your steps...</Typography>
                  )}
                </Stack>
              </BentoCard>
            </Grid>

            {/* 2. QUICK ACTIONS (Now beside Routine) */}
            <Grid item size={{ xs: 12, md: 5 }}>
              <BentoCard 
                title="Log Activity" 
                icon={CheckCircleIcon}
                action={
                  <Typography variant="caption" sx={{ color: DARK_GREEN, opacity: 0.4, fontWeight: 500, fontSize: '0.6rem', letterSpacing: 0.5 }}>
                    TAP TO RECORD
                  </Typography>
                }
              >
                <Stack spacing={1}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => setLoggedToday(true)}
                    startIcon={loggedToday ? <DoneIcon sx={{ fontSize: 14 }} /> : null}
                    sx={{ 
                      bgcolor: loggedToday ? DARK_GREEN : alpha(DARK_GREEN, 0.03),
                      color: loggedToday ? 'white' : DARK_GREEN,
                      borderRadius: 3,
                      py: 0.8,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: alpha(DARK_GREEN, 0.06), boxShadow: 'none' }
                    }}
                  >
                    {loggedToday ? "Washed" : "I washed today"}
                  </Button>
                  <Grid container spacing={1}>
                    <Grid item size={{ xs: 6 }}>
                      <IconButton sx={{ bgcolor: alpha(MEDIUM_GREEN, 0.03), borderRadius: 3, width: '100%', py: 0.8 }}>
                         <Stack alignItems="center">
                           <FlareIcon sx={{ color: MEDIUM_GREEN, fontSize: 14, mb: 0.2 }} />
                           <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.6rem' }}>Massage</Typography>
                         </Stack>
                      </IconButton>
                    </Grid>
                    <Grid item size={{ xs: 6 }}>
                      <IconButton sx={{ bgcolor: alpha(MEDIUM_GREEN, 0.03), borderRadius: 3, width: '100%', py: 0.8 }}>
                         <Stack alignItems="center">
                           <WaterDropIcon sx={{ color: MEDIUM_GREEN, fontSize: 14, mb: 0.2 }} />
                           <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.6rem' }}>Misted</Typography>
                         </Stack>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Stack>
              </BentoCard>
            </Grid>

            {/* 3. WEATHER IMPACT (Moved to second row) */}
            <Grid item size={{ xs: 12, md: 4 }}>
              <BentoCard title="Forecast" icon={CloudIcon}>
                <Box sx={{ 
                  p: 1.8, 
                  borderRadius: 4, 
                  background: 'rgba(227, 242, 253, 0.3)',
                  color: '#1565C0',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
                    <FlareIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>72°F · Clear</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 400, lineHeight: 1.4, display: 'block', opacity: 0.8, fontSize: '0.65rem' }}>
                    {weatherAdvice[porosity] || weatherAdvice['Normal']}
                  </Typography>
                </Box>
              </BentoCard>
            </Grid>

            {/* 4. HISTORY */}
            <Grid item size={{ xs: 12, md: 8 }}>
              <BentoCard title="Journal" icon={HistoryIcon}>
                {isLoadingHistory ? (
                  <LinearProgress sx={{ color: DARK_GREEN, borderRadius: 2, height: 1.5 }} />
                ) : history.length > 0 ? (
                  <Stack spacing={0.8}>
                    {history.map((event, i) => (
                      <Box key={i} sx={{ 
                        p: 1.2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: alpha('#FF5252', 0.05), color: '#FF5252', width: 28, height: 28 }}>
                             <LocalHospitalIcon sx={{ fontSize: 12 }} />
                          </Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', color: DARK_GREEN, fontSize: '0.65rem' }}>
                              {event.target_vital?.toUpperCase()} CHECK
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.5, fontSize: '0.6rem' }}>
                              Score: {event.vital_value}/10
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="caption" sx={{ fontWeight: 500, opacity: 0.25, fontSize: '0.55rem' }}>TODAY</Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="caption" sx={{ opacity: 0.4, textAlign: 'center', py: 0.5, display: 'block' }}>No logs.</Typography>
                )}
              </BentoCard>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
}
