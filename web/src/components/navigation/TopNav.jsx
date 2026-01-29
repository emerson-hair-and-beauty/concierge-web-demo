"use client";

import React from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Box,
  alpha
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const DARK_GREEN = "#2D5A4A";

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Map pathname to value
  let value = 0;
  if (pathname === '/routine/result') value = 0;
  if (pathname === '/routine/summary') value = 1;

  const handleChange = (event, newValue) => {
    if (newValue === 0) router.push('/routine/result');
    if (newValue === 1) router.push('/routine/summary');
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1050, // Below UserNav (1100)
        borderRadius: 0,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        justifyContent: 'center'
      }} 
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: DARK_GREEN,
            height: 3,
            borderRadius: '3px 3px 0 0'
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.85rem',
            color: alpha(DARK_GREEN, 0.4),
            minHeight: 56,
            px: 3,
            '&.Mui-selected': {
              color: DARK_GREEN,
              fontWeight: 700
            }
          }
        }}
      >
        <Tab label="Routine" />
        <Tab label="Journal" />
      </Tabs>
    </Paper>
  );
}
