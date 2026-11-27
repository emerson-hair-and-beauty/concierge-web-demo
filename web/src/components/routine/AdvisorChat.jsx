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
} from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LogoutIcon from '@mui/icons-material/Logout';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
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

// Full-page variant: the chat is the whole screen, not a floating panel.
const PageShell = styled(Box)({
  height: '100dvh',
  width: '100%',
  maxWidth: '860px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.85)',
  overflow: 'hidden',
});

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

const ProductRow = styled(Box)({
  display: 'flex',
  gap: '10px',
  overflowX: 'auto',
  paddingBottom: '4px',
  alignSelf: 'stretch',
  flexShrink: 0,
});

const ProductCard = styled(Paper)({
  flex: '0 0 180px',
  borderRadius: '14px',
  border: '1px solid rgba(74, 61, 45, 0.15)',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  color: 'inherit',
  textDecoration: 'none',
  'a&': { cursor: 'pointer', transition: 'border-color 0.2s ease' },
  'a&:hover': { borderColor: '#4A3D2D' },
});

const ProductImage = styled(Box)({
  height: '140px',
  background: 'rgba(74, 61, 45, 0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(74, 61, 45, 0.35)',
  '& img': { width: '100%', height: '100%', objectFit: 'contain' },
});

// The options of a clarification question. One tap sends the option.
const OptionRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignSelf: 'flex-start',
  maxWidth: '85%',
});

// variant="floating" (default): a button in the corner opens a panel.
// variant="page": the chat fills the page. onSignOut adds a sign-out button.
export default function AdvisorChat({
  isOpenExternal,
  onCloseExternal,
  onOpenExternal,
  variant = 'floating',
  onSignOut,
}) {
  const isPage = variant === 'page';
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputText, setInputText] = useState('');

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
    statusText,
    awaitingReply,
    sendMessage,
    answerClarification,
    resetChat,
  } = useAdvisorChat(user?.uid);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, pendingClarification, statusText]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const chatContent = (
    <>
      <ChatHeader>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {isPage ? (
            onSignOut && (
              <IconButton size="small" onClick={onSignOut} sx={{ color: 'white' }} title="Sign out">
                <LogoutIcon fontSize="small" />
              </IconButton>
            )
          ) : (
            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
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
              Curl Concierge
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
              by Emerson
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: '#8B7355', width: 32, height: 32 }}>
            <SmartToyIcon fontSize="small" />
          </Avatar>
        </Box>
      </ChatHeader>

        <>
          <MessageList ref={scrollRef}>
            {messages.length === 0 && (
              <MessageBubble isUser={false}>
                Hi! Tell me what&apos;s going on with your hair and I&apos;ll help you work through it.
              </MessageBubble>
            )}
            {messages.map((msg, i) => (
              <React.Fragment key={msg.id || i}>
                <MessageBubble isUser={msg.role === 'user'}>
                  {msg.content}
                </MessageBubble>
                {msg.products?.length > 0 && (
                  <ProductRow>
                    {msg.products.map((p) => (
                      // A card with a url opens the shop page in a new tab.
                      // A card without a url is not clickable.
                      <ProductCard
                        key={p.id}
                        elevation={0}
                        {...(p.url
                          ? { component: 'a', href: p.url, target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        <ProductImage>
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.image} alt={p.name} loading="lazy" />
                          ) : (
                            <ImageOutlinedIcon fontSize="large" />
                          )}
                        </ProductImage>
                        <Box sx={{ p: '10px 14px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2B2318', lineHeight: 1.3 }}>
                          {p.name}
                        </Typography>
                        {p.brand && (
                          <Typography variant="caption" sx={{ color: '#8B7355' }}>
                            {p.brand}
                          </Typography>
                        )}
                        {(p.category || p.primary_focus) && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {[p.category, p.primary_focus].filter(Boolean).join(' · ')}
                          </Typography>
                        )}
                        </Box>
                      </ProductCard>
                    ))}
                  </ProductRow>
                )}
              </React.Fragment>
            ))}
            {pendingClarification && !isLoading && (
              <OptionRow>
                {(pendingClarification.options || []).map((opt, i) => (
                  <Button
                    key={i}
                    variant="outlined"
                    size="small"
                    onClick={() => answerClarification(opt.label)}
                    sx={{
                      textTransform: 'none',
                      textAlign: 'left',
                      borderRadius: '14px',
                      borderColor: 'rgba(74, 61, 45, 0.35)',
                      color: '#4A3D2D',
                      background: 'white',
                      '&:hover': { borderColor: '#4A3D2D', background: 'rgba(74, 61, 45, 0.06)' },
                    }}
                  >
                    {opt.label}
                  </Button>
                ))}
              </OptionRow>
            )}
            {/* The progress line shows the last status until the first reply text arrives. */}
            {isLoading && awaitingReply && (
              <Box sx={{ alignSelf: 'flex-start', ml: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} sx={{ color: '#4A3D2D' }} />
                {statusText && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    {statusText}
                  </Typography>
                )}
              </Box>
            )}
          </MessageList>

          <InputArea>
            <TextField
              id="advisor-chat-input"
              fullWidth
              size="small"
              placeholder={pendingClarification ? "Or type your own answer..." : "Tell me about your hair..."}
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
    </>
  );

  if (isPage) {
    return <PageShell>{chatContent}</PageShell>;
  }

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
          {chatContent}
        </ChatProvider>
      </Fade>
    </>
  );
}
