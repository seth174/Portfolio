import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

interface CardParams {
    combinedArray?: string[];
    title: string;
    imageUrl: string;
    description: string;
    link: string;
    isProject: boolean;
}

const CustomCard: React.FC<CardParams> = ({ combinedArray, title, imageUrl, description, link, isProject }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleURLClick = (url: string, isProject: boolean) => {
        if (isProject) {
            window.open(url, '_blank');
        } else {
            navigate(url);
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 200,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isHovered
                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
                            : 'transparent',
                        transition: 'all 0.4s ease',
                        zIndex: 1,
                    },
                }}
            >
                <CardMedia
                    component="img"
                    alt={title}
                    height="200"
                    width="100%"
                    image={imageUrl}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                />
            </Box>
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: { xs: '1.4rem', md: '1.6rem' },
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        lineHeight: 1.7,
                        flexGrow: 1,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                >
                    {description}
                </Typography>

                {combinedArray && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            mt: 'auto',
                        }}
                    >
                        {combinedArray.slice(0, 6).map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                                    },
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        color: 'primary.main',
                                    }}
                                >
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                        {combinedArray.length > 6 && (
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    +{combinedArray.length - 6}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}
            </CardContent>
            {link && isProject && (
                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        size="medium"
                        onClick={() => handleURLClick(link, isProject)}
                        endIcon={<LaunchIcon />}
                        sx={{
                            width: '100%',
                            borderRadius: '12px',
                            py: 1.2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: '0.95rem',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.5)',
                            },
                        }}
                    >
                        View Project
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default CustomCard;
