// components/Home.tsx
import { Box, Container, Typography, Button, Stack, Fade, Grow } from '@mui/material';
import { keyframes } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);
    const [slideUp, setSlideUp] = useState(false);

    useEffect(() => {
        setFadeIn(true);
        setTimeout(() => setSlideUp(true), 200);
    }, []);

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 8, md: 12 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Fade in={fadeIn} timeout={1000}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                mb: 2,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.1,
                            }}
                        >
                            Seth Fagen
                    </Typography>
                        <Grow in={slideUp} timeout={1200} style={{ transitionDelay: '300ms' }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                    fontWeight: 300,
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    mb: 6,
                                    letterSpacing: '0.05em',
                                }}
                            >
                                Software Engineer
                    </Typography>
                        </Grow>
                    </Box>
                </Fade>

                <Fade in={slideUp} timeout={1200} style={{ transitionDelay: '500ms' }}>
                    <Box
                        sx={{
                            maxWidth: '600px',
                            mb: 6,
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                fontWeight: 400,
                                lineHeight: 1.8,
                                mb: 4,
                            }}
                        >
                            Building scalable solutions with modern technology.
                            <br />
                            Passionate about innovation and clean code.
                    </Typography>
                    </Box>
                </Fade>

                <Fade in={slideUp} timeout={1200} style={{ transitionDelay: '700ms' }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        sx={{ mb: 8, width: '100%', maxWidth: '500px', justifyContent: 'center' }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/projects')}
                            startIcon={<CodeIcon />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '50px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                color: '#667eea',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 1)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            View Projects
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/blog')}
                            startIcon={<RocketLaunchIcon />}
                            sx={{
                                py: 1.5,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: '50px',
                                borderColor: 'rgba(255, 255, 255, 0.8)',
                                color: 'rgba(255, 255, 255, 0.95)',
                                borderWidth: 2,
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 1)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            Read Blog
                        </Button>
                    </Stack>
                </Fade>

                <Fade in={slideUp} timeout={1200} style={{ transitionDelay: '900ms' }}>
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            mt: 4,
                        }}
                    >
                        <Box
                            component="a"
                            href="https://github.com/seth174"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-4px) scale(1.1)',
                                    color: '#fff',
                                },
                            }}
                        >
                            <GitHubIcon sx={{ fontSize: 28 }} />
                        </Box>
                        <Box
                            component="a"
                            href="https://www.linkedin.com/in/seth-fagen-614648162/"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    transform: 'translateY(-4px) scale(1.1)',
                                    color: '#fff',
                                },
                            }}
                        >
                            <LinkedInIcon sx={{ fontSize: 28 }} />
                        </Box>
                    </Stack>
                </Fade>

                {/* Floating animated elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        animation: `${floatAnimation} 6s ease-in-out infinite`,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '15%',
                        right: '15%',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        animation: `${floatAnimation} 8s ease-in-out infinite`,
                        animationDelay: '2s',
                    }}
                />
        </Container>
        </Box>
    );
};

export default Home;
