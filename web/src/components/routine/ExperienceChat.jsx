"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  IconButton, 
  Typography, 
  TextField, 
  Button, 
  Slider, 
  Fade, 
  CircularProgress,
  Avatar,
  Backdrop
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { styled } from '@mui/material/styles';
import { useExperienceChat } from '@/hooks/useExperienceChat';
import { useUserData } from '@/hooks/useUserData';

const ChatProvider = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  width: '380px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  zIndex: 2100, // Higher than UserNav (1100)
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
    borderRadius: '0',
  }
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  background: 'rgba(45, 90, 74, 0.9)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const MessageList = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})(({ isUser }) => ({
  alignSelf: isUser ? 'flex-end' : 'flex-start',
  maxWidth: '80%',
  padding: '12px 16px',
  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  background: isUser ? '#2D5A4A' : 'rgba(255, 255, 255, 0.9)',
  color: isUser ? 'white' : '#1A342B',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  fontSize: '0.95rem',
  lineHeight: 1.4,
}));

const InputArea = styled(Box)({
  padding: '16px',
  background: 'rgba(255, 255, 255, 0.5)',
  borderTop: '1px solid rgba(0,0,0,0.05)',
  display: 'flex',
  gap: '8px',
});

const DoctorPanel = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '20px',
  height: '100%',
  justifyContent: 'center',
});

export default function ExperienceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [sliderValue, setSliderValue] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { user } = useUserData();
  const { 
    messages, 
    isLoading, 
    isHandoff, 
    targetVital, 
    sendMessage, 
    saveEvent, 
    resetChat 
  } = useExperienceChat(user?.uid);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleSubmitVitals = async () => {
    const success = await saveEvent(sliderValue);
    if (success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        resetChat();
      }, 3000);
    }
  };

  return (
    <>
      <IconButton 
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '64px',
          height: '64px',
          background: '#2D5A4A',
          color: 'white',
          boxShadow: '0 8px 24px rgba(45, 90, 74, 0.3)',
          transition: 'all 0.3s ease',
          zIndex: 2000, // Higher than UserNav (1100)
          '&:hover': {
            background: '#1A342B',
            transform: 'scale(1.1)',
          },
          display: isOpen ? 'none' : 'flex'
        }}
      >
        <ChatIcon />
      </IconButton>

      <Backdrop
        open={isOpen}
        onClick={() => setIsOpen(false)}
        sx={{ 
          zIndex: 2050, 
          background: 'rgba(45, 90, 74, 0.2)',
          backdropFilter: 'blur(4px)'
        }}
      />

      <Fade in={isOpen}>
        <ChatProvider elevation={0}>
          <ChatHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: isHandoff ? '#FF5252' : '#4A8B71', width: 32, height: 32 }}>
                {isHandoff ? <HealthAndSafetyIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {isHandoff ? 'Doctor Mode' : 'Empath AI'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {isHandoff ? 'Precision Measurement' : 'Tracking your routine'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {!isHandoff && messages.length > 0 && (
                <IconButton 
                  size="small" 
                  onClick={resetChat} 
                  sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}
                  title="Clear conversation"
                >
                  <DeleteSweepIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </ChatHeader>

          {isSubmitted ? (
            <Box sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ color: '#2D5A4A', mb: 2 }}>Event Saved!</Typography>
              <Typography variant="body2">Thank you for your feedback. We're using this to refine your routine.</Typography>
            </Box>
          ) : isHandoff ? (
            <DoctorPanel>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                {targetVital?.toUpperCase()} Vitals
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Based on our chat, let's precisely measure your {targetVital}.
                How would you rate it from 1 to 10?
              </Typography>
              
              <Slider
                value={sliderValue}
                onChange={(e, val) => setSliderValue(val)}
                step={1}
                marks
                min={1}
                max={10}
                valueLabelDisplay="auto"
                sx={{ 
                  color: '#2D5A4A',
                  '& .MuiSlider-valueLabel': { background: '#2D5A4A' }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: -1 }}>
                <Typography variant="caption">Poor</Typography>
                <Typography variant="caption">Perfect</Typography>
              </Box>

              <Button 
                variant="contained" 
                onClick={handleSubmitVitals}
                fullWidth
                sx={{ 
                  mt: 4, 
                  bgcolor: '#2D5A4A',
                  borderRadius: '12px',
                  py: 1.5,
                  '&:hover': { bgcolor: '#1A342B' }
                }}
              >
                Save Vitals
              </Button>
            </DoctorPanel>
          ) : (
            <>
              <MessageList ref={scrollRef}>
                {messages.length === 0 && (
                  <MessageBubble isUser={false}>
                    Hi! I'm here to help you track how your routine is going. How do your hair and scalp feel today?
                  </MessageBubble>
                )}
                {messages.map((msg, i) => (
                  <MessageBubble key={i} isUser={msg.role === 'user'}>
                    {msg.content}
                  </MessageBubble>
                ))}
                {isLoading && (
                  <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                    <CircularProgress size={16} sx={{ color: '#2D5A4A' }} />
                  </Box>
                )}
              </MessageList>

              <InputArea>
                <TextField 
                  fullWidth 
                  size="small" 
                  placeholder="Tell me how it feels..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      background: 'white'
                    }
                  }}
                />
                <IconButton 
                  onClick={handleSend}
                  disabled={!inputText.trim() || isLoading}
                  sx={{ 
                    bgcolor: '#2D5A4A', 
                    color: 'white',
                    '&:hover': { bgcolor: '#1A342B' },
                    '&.Mui-disabled': { bgcolor: '#ccc' }
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </InputArea>
            </>
          )}
        </ChatProvider>
      </Fade>
    </>
  );
}
