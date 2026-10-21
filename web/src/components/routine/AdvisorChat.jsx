"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  TextField,
  Button,
  Fade,
  CircularProgress,
  Avatar,
  Backdrop,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { styled } from '@mui/material/styles';
import { useAdvisorChat } from '@/hooks/useAdvisorChat';
import { useUserData } from '@/hooks/useUserData';

// Same visual language as ExperienceChat.jsx, mirrored to the opposite
// corner so the two widgets never overlap.
const ChatProvider = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '32px',
  left: '32px',
  width: '460px',
  height: '640px',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  zIndex: 2100,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '0',
  }
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: '16px 20px',
  background: 'rgba(74, 61, 45, 0.9)',
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
  maxWidth: '85%',
  padding: '12px 16px',
  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  background: isUser ? '#4A3D2D' : 'rgba(255, 255, 255, 0.9)',
  color: isUser ? 'white' : '#2B2318',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  fontSize: '0.95rem',
  lineHeight: 1.4,
  whiteSpace: 'pre-wrap',
}));

const InputArea = styled(Box)({
  padding: '16px',
  background: 'rgba(255, 255, 255, 0.5)',
  borderTop: '1px solid rgba(0,0,0,0.05)',
  display: 'flex',
  gap: '8px',
});

const ClarificationPanel = styled(Box)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  height: '100%',
  overflowY: 'auto',
});

export default function AdvisorChat({ isOpenExternal, onCloseExternal, onOpenExternal }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalOpen;
  const setIsOpen = (val) => {
    if (val === false && onCloseExternal) onCloseExternal();
    if (val === true && onOpenExternal) onOpenExternal();
    setInternalOpen(val);
  };

  const { user } = useUserData();
  const {
    messages,
    isLoading,
    pendingClarification,
    sendMessage,
    answerClarification,
    resetChat,
  } = useAdvisorChat(user?.uid);

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

  const handleSubmitClarification = () => {
    if (!selectedOption) return;
    answerClarification(selectedOption);
    setSelectedOption('');
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '32px',
          left: '32px',
          width: '64px',
          height: '64px',
          background: '#4A3D2D',
          color: 'white',
          boxShadow: '0 8px 24px rgba(74, 61, 45, 0.3)',
          transition: 'all 0.3s ease',
          zIndex: 2000,
          '&:hover': {
            background: '#2B2318',
            transform: 'scale(1.1)',
          },
          display: isOpen ? 'none' : 'flex'
        }}
      >
        <SpaIcon />
      </IconButton>

      <Backdrop
        open={isOpen}
        onClick={() => setIsOpen(false)}
        sx={{
          zIndex: 2050,
          background: 'rgba(74, 61, 45, 0.2)',
          backdropFilter: 'blur(4px)'
        }}
      />

      <Fade in={isOpen}>
        <ChatProvider elevation={0}>
          <ChatHeader>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
              {messages.length > 0 && (
                <IconButton
                  size="small"
                  onClick={resetChat}
                  sx={{ color: 'white', opacity: 0.8, '&:hover': { opacity: 1 } }}
                  title="Clear conversation"
                >
                  <DeleteSweepIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'right' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  Hair Advisor
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                  Ask Emerson
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#8B7355', width: 32, height: 32 }}>
                <SmartToyIcon fontSize="small" />
              </Avatar>
            </Box>
          </ChatHeader>

          {pendingClarification ? (
            <ClarificationPanel>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#2B2318' }}>
                {pendingClarification.question}
              </Typography>
              <RadioGroup
                key={pendingClarification.question}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {(pendingClarification.options || []).map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    value={opt.label}
                    control={<Radio sx={{ color: '#4A3D2D', '&.Mui-checked': { color: '#4A3D2D' } }} />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
              <Button
                variant="contained"
                onClick={handleSubmitClarification}
                disabled={!selectedOption || isLoading}
                fullWidth
                sx={{
                  mt: 'auto',
                  bgcolor: '#4A3D2D',
                  borderRadius: '12px',
                  py: 1.5,
                  '&:hover': { bgcolor: '#2B2318' }
                }}
              >
                That sounds right
              </Button>
            </ClarificationPanel>
          ) : (
            <>
              <MessageList ref={scrollRef}>
                {messages.length === 0 && (
                  <MessageBubble isUser={false}>
                    Hi! Tell me what&apos;s going on with your hair and I&apos;ll help you work through it.
                  </MessageBubble>
                )}
                {messages.map((msg, i) => (
                  <MessageBubble key={i} isUser={msg.role === 'user'}>
                    {msg.content}
                  </MessageBubble>
                ))}
                {isLoading && (
                  <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                    <CircularProgress size={16} sx={{ color: '#4A3D2D' }} />
                  </Box>
                )}
              </MessageList>

              <InputArea>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Tell me about your hair..."
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
                    bgcolor: '#4A3D2D',
                    color: 'white',
                    '&:hover': { bgcolor: '#2B2318' },
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
