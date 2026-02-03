// components/Projects.tsx
import React, { useEffect, useState } from 'react';
import Project from '../models/Projects';
import ProjectCard from '../components/ProjectCard';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    useMediaQuery,
    useTheme,
    Container,
    Typography,
    Fade,
    Grow,
    Slide,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import axios from 'axios';
import AutoCompleteFilter from '../components/AutoCompleteFilter';
import LoadingBar from '../components/LoadingBar';
import Error from '../components/Error';
import { keyframes } from '@mui/system';

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
`;

const Projects: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL!;

    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<string[]>([]);
    const [filteredLanguages, setFilteredLanguages] = useState<Set<string>>(new Set<string>());
    const [frameworks, setFrameworks] = useState<string[]>([]);
    const [filteredFrameworks, setFilteredFrameworks] = useState<Set<string>>(new Set<string>());
    const [libraries, setLibraries] = useState<string[]>([]);
    const [filteredLibraries, setFilteredLibraries] = useState<Set<string>>(new Set<string>());
    const [error, setError] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


    const [apiProjects, setApiProjects] = useState<Project[]>([]);

    const handleFilterClick = () => {
        setDisabled((prev) => !prev);
    };

    const shouldShowProjectCard = (languages: string[], libaries: string[], frameworks: string[]): boolean => {
        const hasLanguage = languages.some((value) => {
            return filteredLanguages.has(value);
        });

        const hasLibrary = libaries.some((value) => {
            return filteredLibraries.has(value);
        });

        const hasFramework = frameworks.some((value) => {
            return filteredFrameworks.has(value);
        });

        return (
            (filteredLanguages.size === 0 ? true : hasLanguage) &&
            (filteredLibraries.size === 0 ? true : hasLibrary) &&
            (filteredFrameworks.size === 0 ? true : hasFramework)
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/GetProjects`);
                setApiProjects(response.data.sort((a: Project, b: Project) => a.sortOrder - b.sortOrder));

                const languagesSet = new Set<string>();
                const frameworksSet = new Set<string>();
                const librariesSet = new Set<string>();

                response.data.forEach((project: Project) => {
                    project.languages.forEach((language) => languagesSet.add(language));
                    project.frameworks.forEach((framework) => frameworksSet.add(framework));
                    project.libraries.forEach((library) => librariesSet.add(library));
                });

                setLanguages(Array.from(languagesSet).sort());
                setFrameworks(Array.from(frameworksSet).sort());
                setLibraries(Array.from(librariesSet).sort());
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

    const filteredProjects = apiProjects.filter((project) =>
        shouldShowProjectCard(project.languages, project.libraries, project.frameworks)
    );

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                },
            }}
        >
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 8 }, pb: 4, position: 'relative', zIndex: 1 }}>
                <Fade in={fadeIn} timeout={800}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                            Projects
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
                            Exploring innovative solutions and cutting-edge technology
                        </Typography>
                    </Box>
                </Fade>

                {/* Filter Section */}
                {!isSmallScreen && (
                    <Fade in={fadeIn} timeout={1000} style={{ transitionDelay: '200ms' }}>
                        <Box
                            sx={{
                                mb: 6,
                                position: 'relative',
                            }}
                        >
                            {/* Toggle Button */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 3,
                                }}
                            >
                                <Box
                                    onClick={handleFilterClick}
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        px: 3,
                                        py: 1.5,
                                        borderRadius: '50px',
                                        background: disabled
                                            ? 'rgba(255, 255, 255, 0.6)'
                                            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                                        backdropFilter: 'blur(20px)',
                                        border: disabled
                                            ? '1px solid rgba(255, 255, 255, 0.3)'
                                            : '1px solid rgba(102, 126, 234, 0.4)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        boxShadow: disabled
                                            ? '0 4px 15px rgba(0, 0, 0, 0.05)'
                                            : '0 8px 25px rgba(102, 126, 234, 0.2)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: disabled
                                                ? '0 6px 20px rgba(0, 0, 0, 0.1)'
                                                : '0 12px 35px rgba(102, 126, 234, 0.3)',
                                            background: disabled
                                                ? 'rgba(255, 255, 255, 0.8)'
                                                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                                        },
                                    }}
                                >
                                    <TuneIcon
                                        sx={{
                                            color: disabled ? 'text.secondary' : '#667eea',
                                            fontSize: '1.5rem',
                                            transition: 'transform 0.3s ease',
                                            transform: disabled ? 'rotate(0deg)' : 'rotate(90deg)',
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: disabled ? 'text.secondary' : '#667eea',
                                            fontSize: '0.95rem',
                                        }}
                                    >
                                        {disabled ? 'Show Filters' : 'Hide Filters'}
                                    </Typography>
                                    {(filteredLanguages.size > 0 ||
                                        filteredFrameworks.size > 0 ||
                                        filteredLibraries.size > 0) && (
                                        <Box
                                            sx={{
                                                ml: 0.5,
                                                px: 1.2,
                                                py: 0.3,
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                minWidth: '24px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {filteredLanguages.size +
                                                filteredFrameworks.size +
                                                filteredLibraries.size}
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            {/* Filter Inputs */}
                            <Slide direction="down" in={!disabled} mountOnEnter unmountOnExit>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        p: 3,
                                        borderRadius: '20px',
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    <Box sx={{ flex: '1 1 280px', minWidth: '280px', maxWidth: '320px' }}>
                            <AutoCompleteFilter
                                            label="Languages"
                                options={languages}
                                setFilteredOptions={setFilteredLanguages}
                                disabled={disabled}
                            />
                                    </Box>
                                    <Box sx={{ flex: '1 1 280px', minWidth: '280px', maxWidth: '320px' }}>
                            <AutoCompleteFilter
                                            label="Frameworks"
                                options={frameworks}
                                setFilteredOptions={setFilteredFrameworks}
                                disabled={disabled}
                            />
                                    </Box>
                                    <Box sx={{ flex: '1 1 280px', minWidth: '280px', maxWidth: '320px' }}>
                            <AutoCompleteFilter
                                            label="Libraries"
                                options={libraries}
                                setFilteredOptions={setFilteredLibraries}
                                disabled={disabled}
                            />
                                    </Box>
                                </Box>
                            </Slide>
                        </Box>
                    </Fade>
                )}

                {/* Projects Grid */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {filteredProjects.map((project, index) => (
                        <Grow
                            in={fadeIn}
                            timeout={600}
                            style={{ transitionDelay: `${300 + index * 100}ms` }}
                            key={index}
                        >
                            <Grid xs={12} sm={6} md={4} lg={4}>
                        <ProjectCard project={project} />
                    </Grid>
                        </Grow>
                ))}
            </Grid>

                {filteredProjects.length === 0 && (
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
                                No projects match your filters
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Try adjusting your search criteria
                            </Typography>
                        </Box>
                    </Fade>
                )}
            </Container>

            {/* Floating decorative elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '5%',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.1)',
                    animation: `${floatAnimation} 8s ease-in-out infinite`,
                    zIndex: 0,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '8%',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(118, 75, 162, 0.1)',
                    animation: `${floatAnimation} 10s ease-in-out infinite`,
                    animationDelay: '2s',
                    zIndex: 0,
                }}
            />
        </Box>
    );
};

export default Projects;
