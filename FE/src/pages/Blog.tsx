import { Box, Container, Typography, Fade, Grow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Blog as Blogv2 } from '../models/Blogs';
import CustomCard from '../components/CustomCard';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingBar from '../components/LoadingBar';
import Error from '../components/Error';
import { keyframes } from '@mui/system';

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
`;

const Blog: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL!;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [blogs, setBlogs] = useState<Blogv2[]>([]);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/blogs`);
                setBlogs(response.data);
            } catch (error) {
                console.log('error!!');
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
                setTimeout(() => setFadeIn(true), 100);
            }
        };

        fetchData();
    }, [apiUrl]);

    if (loading) {
        return <LoadingBar />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 30%, rgba(168, 237, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(254, 214, 227, 0.3) 0%, transparent 50%)',
                    pointerEvents: 'none',
                },
            }}
        >
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 8 }, pb: 6, position: 'relative', zIndex: 1 }}>
                <Fade in={fadeIn} timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                mb: 2,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Blog
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 300,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                                maxWidth: '600px',
                                mx: 'auto',
                            }}
                        >
                            Thoughts, insights, and discoveries from my journey in tech
                        </Typography>
                    </Box>
                </Fade>

                {/* Blog Posts Grid */}
                <Grid container spacing={4}>
                    {blogs.map((blog, index) => (
                        <Grow
                            in={fadeIn}
                            timeout={600}
                            style={{ transitionDelay: `${300 + index * 100}ms` }}
                            key={index}
                        >
                            <Grid xs={12} sm={6} md={4} lg={4}>
                                <CustomCard
                                    title={blog.title}
                                    imageUrl={blog.imageURL}
                                    description={blog.summary}
                                    link=""
                                    isProject={false}
                                />
                            </Grid>
                        </Grow>
                    ))}
                </Grid>

                {blogs.length === 0 && (
                    <Fade in={fadeIn} timeout={800}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 8,
                                px: 3,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 300,
                                    mb: 2,
                                }}
                            >
                                No blog posts yet
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Check back soon for new content!
                            </Typography>
                        </Box>
                    </Fade>
                )}
            </Container>

            {/* Floating decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '5%',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(168, 237, 234, 0.2)',
                    animation: `${floatAnimation} 8s ease-in-out infinite`,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '10%',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: 'rgba(254, 214, 227, 0.2)',
                    animation: `${floatAnimation} 10s ease-in-out infinite`,
                    animationDelay: '3s',
                    zIndex: 0,
                }}
            />
        </Box>
    );
};

export default Blog;
