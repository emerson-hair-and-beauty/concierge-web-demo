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
  Button,
  Tabs,
  Tab,
  Tooltip as MuiTooltip
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
import { useRouter, usePathname } from "next/navigation";

const DARK_GREEN = "#2D5A4A";
const MEDIUM_GREEN = "#426A5B";

const BentoCard = ({ title, icon: Icon, children, sx = {}, height = '100%', action, color = DARK_GREEN }) => (
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
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
        <Avatar sx={{ bgcolor: alpha(color, 0.08), color: color, width: 28, height: 28 }}>
          {Icon && <Icon sx={{ fontSize: 16 }} />}
        </Avatar>
        <Typography variant="overline" sx={{ fontWeight: 800, color: color, letterSpacing: 1.2, fontSize: '0.65rem' }}>
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
  </Card>
);

const VitalBarChart = ({ data, color, onPointClick, selectedValue }) => {
  if (!data || data.length === 0) return (
    <Box sx={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="caption" sx={{ opacity: 0.3 }}>No data for chart</Typography>
    </Box>
  );
  
  const points = [...data].reverse();
  const height = 120;
  const barWidth = 32;
  const barGap = 16;
  const width = Math.max(points.length * (barWidth + barGap), 300);
  const padding = 10;
  
  const minVal = 0;
  const maxVal = 10;
  
  const getY = (v) => height - padding - ((v - minVal) / (maxVal - minVal)) * (height - padding * 2);
  
  return (
    <Box sx={{ 
      width: '100%', 
      overflowX: 'auto', 
      py: 1, 
      '&::-webkit-scrollbar': { height: 2 }, 
      '&::-webkit-scrollbar-thumb': { bgcolor: alpha(color, 0.1), borderRadius: 2 } 
    }}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {points.map((v, i) => {
          const x = padding + i * (barWidth + barGap);
          const barHeight = height - padding - getY(v);
          const isSelected = selectedValue === v;
          
          return (
            <g key={i} onClick={() => onPointClick(v)} style={{ cursor: 'pointer' }}>
              <MuiTooltip title={`Score: ${v}`} arrow>
                <rect
                  x={x}
                  y={getY(v)}
                  width={barWidth}
                  height={barHeight}
                  rx={8}
                  fill={isSelected ? color : alpha(color, 0.2)}
                  style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={(e) => { if(!isSelected) e.target.setAttribute('fill', alpha(color, 0.4)) }}
                  onMouseLeave={(e) => { if(!isSelected) e.target.setAttribute('fill', alpha(color, 0.2)) }}
                />
              </MuiTooltip>
              {isSelected && (
                <text 
                  x={x + barWidth / 2} 
                  y={getY(v) - 8} 
                  textAnchor="middle" 
                  fontSize="10" 
                  fontWeight="700" 
                  fill={color}
                >
                  {v}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Box>
  );
};

const MOCK_VITALS = {
  moisture: {
    latest: 6,
    average: 6.3,
    history: [6, 8, 5, 7, 4, 6, 5]
  },
  scalp: {
    latest: 9,
    average: 9.0,
    history: [9, 8, 9, 7, 9, 8, 9]
  },
  definition: {
    latest: 7,
    average: 6.5,
    history: [7, 6, 5, 8, 7, 6, 7]
  },
  breakage: {
    latest: 7,
    average: 5.5,
    history: [7, 4, 6, 5, 7, 4, 6]
  }
};

export default function JourneyDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { selections } = useOnboardingStore();
  const { user } = useUserData();
  const [history, setHistory] = useState([]);
  const [vitals, setVitals] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingVitals, setIsLoadingVitals] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);
  const [activeVitalTab, setActiveVitalTab] = useState(0);
  const [selectedPointValue, setSelectedPointValue] = useState(null);

  const isInsightsPage = pathname === '/routine/insights';

  const VITALS_CONFIG = [
    { key: 'moisture', label: 'Moisture', icon: WaterDropIcon, color: DARK_GREEN },
    { key: 'scalp', label: 'Scalp', icon: FlareIcon, color: DARK_GREEN },
    { key: 'definition', label: 'Definition', icon: CheckCircleIcon, color: DARK_GREEN },
    { key: 'breakage', label: 'Strength', icon: LocalHospitalIcon, color: DARK_GREEN }
  ];

  const currentVital = VITALS_CONFIG[activeVitalTab];

  useEffect(() => {
    // Determine which user ID to use for fetching
    const fetchId = user?.uid || 'test_user_vitals'; 
    
    if (fetchId) {
      setIsLoadingHistory(true);
      fetch(`/api/diagnostic/history?userId=${fetchId}`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) setHistory(data.slice(0, 5));
        })
        .finally(() => setIsLoadingHistory(false));

      setIsLoadingVitals(true);
      fetch(`/api/vitals?userId=${fetchId}`)
        .then(res => res.json())
        .then(data => {
            // Use mock data if the API returns empty history/nulls
            const isEmpty = !data || Object.values(data).every(v => !v.history || v.history.length === 0);
            if (isEmpty) {
                console.log("Using Mock Vitals fallback");
                setVitals(MOCK_VITALS);
            } else {
                setVitals(data);
            }
        })
        .catch(() => {
            console.log("Fetch failed, using Mock Vitals fallback");
            setVitals(MOCK_VITALS);
        })
        .finally(() => setIsLoadingVitals(false));
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
              <Typography variant="h5" sx={{ ...typographyStyles, fontWeight: 800, color: DARK_GREEN, letterSpacing: -0.5 }}>
                {isInsightsPage ? "Insights" : "Journal"}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: 1.5, opacity: 0.5 }}>
                {isInsightsPage ? "DATA TRENDS" : "COMMAND CENTER"}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {/* INSIGHTS VIEW (Apple Health Evolution) */}
            {isInsightsPage && (
              <Grid item xs={12}>
                <BentoCard 
                  title="Vitals Details" 
                  icon={currentVital.icon} 
                  color={currentVital.color}
                  sx={{ p: 0, overflow: 'hidden' }}
                >
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                    <Tabs 
                      value={activeVitalTab} 
                      onChange={(e, v) => { setActiveVitalTab(v); setSelectedPointValue(null); }}
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{ 
                        '& .MuiTabs-indicator': { bgcolor: currentVital.color },
                        '& .MuiTab-root': { py: 2, fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', minWidth: 80 },
                        '& .Mui-selected': { color: `${currentVital.color} !important` }
                      }}
                    >
                      {VITALS_CONFIG.map((v, i) => (
                        <Tab key={v.key} label={v.label} />
                      ))}
                    </Tabs>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box>
                        <Stack direction="row" alignItems="baseline" spacing={1}>
                          <Typography variant="h4" sx={{ fontWeight: 800, color: DARK_GREEN, letterSpacing: -1 }}>
                            {selectedPointValue !== null ? selectedPointValue : (vitals?.[currentVital.key]?.latest || '--')}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, opacity: 0.6 }}>
                            Score
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.5, display: 'block' }}>
                          Average: {vitals?.[currentVital.key]?.average || '--'}
                        </Typography>
                      </Box>
                      {selectedPointValue !== null && (
                        <Button 
                          size="small" 
                          onClick={() => setSelectedPointValue(null)}
                          sx={{ 
                            fontSize: '0.65rem', 
                            color: currentVital.color, 
                            fontWeight: 700,
                            textTransform: 'none',
                            bgcolor: alpha(currentVital.color, 0.05),
                            px: 1,
                            '&:hover': { bgcolor: alpha(currentVital.color, 0.1) }
                          }}
                        >
                          Reset
                        </Button>
                      )}
                    </Box>

                    <VitalBarChart 
                      data={vitals?.[currentVital.key]?.history} 
                      color={currentVital.color} 
                      selectedValue={selectedPointValue}
                      onPointClick={(val) => setSelectedPointValue(val)} 
                    />
                  </Box>
                </BentoCard>
              </Grid>
            )}

            {/* JOURNAL VIEW (Existing Layout) */}
            {!isInsightsPage && (
              <>
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
          </>
        )}
      </Grid>
    </Box>
      </Fade>
    </Container>
  );
}
