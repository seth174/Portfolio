// components/About.tsx
import React, { useEffect } from 'react';
import Project from '../models/Projects';
import ProjectCard from '../components/ProjectCard';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, CircularProgress, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import axios from 'axios';
import AutoCompleteFilter from '../components/AutoCompleteFilter';

const Projects: React.FC = () => {

    const apiUrl = process.env.REACT_APP_API_URL!;

    const [disabled, setDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [languages, setLanguages] = React.useState<string[]>([]);
    const [filteredLanguages, setFilteredLanguages] = React.useState<Set<string>>(new Set<string>());
    const [frameworks, setFrameworks] = React.useState<string[]>([]);
    const [filteredFrameworks, setFilteredFrameworks] = React.useState<Set<string>>(new Set<string>());
    const [libraries, setLibraries] = React.useState<string[]>([]);
    const [filteredLibraries, setFilteredLibraries] = React.useState<Set<string>>(new Set<string>());

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


    const StyledIconButton = styled(IconButton)(({ theme }) => ({
        cursor: 'pointer',
        '&:hover': {
            cursor: 'pointer',
        },
    }));

    const [apiProjects, setApiProjects] = React.useState<Project[]>([]);

    const handleFilterClick = () => {
        setDisabled((disabled) => !disabled)
    };

    const shouldShowProjectCard = (languages: string[], libaries: string[], frameworks: string[]): boolean => {

        const hasLanguage = languages.some((value) => {
            if (filteredLanguages.has(value)) {
                return true;
            }
        });

        const hasLibrary = libaries.some((value) => {
            if (filteredLibraries.has(value)) {
                return true;
            }
        });

        const hasFramework = frameworks.some((value) => {
            if (filteredFrameworks.has(value)) {
                return true;
            }
        });

        return (filteredLanguages.size == 0 ? true : hasLanguage)
            && (filteredLibraries.size == 0 ? true : hasLibrary)
            && (filteredFrameworks.size == 0 ? true : hasFramework);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/GetProjects`);
                setApiProjects(response.data);

                let languagesSet = new Set<string>();
                let frameworksSet = new Set<string>();
                let librariesSet = new Set<string>();

                response.data.forEach((project: Project) => {
                    project.languages.forEach(language => languagesSet.add(language));
                    project.frameworks.forEach(framework => frameworksSet.add(framework));
                    project.libraries.forEach(library => librariesSet.add(library));
                });

                setLanguages(Array.from(languagesSet).sort());
                setFrameworks(Array.from(frameworksSet).sort());
                setLibraries(Array.from(librariesSet).sort());

                console.log(languages);

            } catch (error) {
                console.log('error!!');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        // Call the async function
        fetchData();
    }, [])

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="75vh"
            >
                <CircularProgress size={100} color="primary" />
            </Box>

        )
    }

    return (
        <Box >
            <Grid container spacing={6} style={{
                margin: 0,
                width: '100%',

            }}>

                {!isSmallScreen &&
                    (
                        <Grid xs={0} sm={1} display="flex" justifyContent="space-between" alignItems="center">
                            {
                                !disabled ?
                                    <StyledIconButton onClick={handleFilterClick}><FilterAltIcon fontSize='large' color='primary' /> </StyledIconButton>
                                    :
                                    <StyledIconButton onClick={handleFilterClick}><FilterAltOffIcon fontSize='large' color='primary' /></StyledIconButton>
                            }
                        </Grid>
                    )
                }
                <Grid sm={4} md={3} display="flex" justifyContent="space-between" alignItems="center">
                    <AutoCompleteFilter
                        label='languages'
                        options={languages}
                        setFilteredOptions={setFilteredLanguages}
                        disabled={disabled}
                    />
                </Grid>
                <Grid sm={4} md={3} display="flex" justifyContent="space-between" alignItems="center">
                    <AutoCompleteFilter
                        label='frameworks'
                        options={frameworks}
                        setFilteredOptions={setFilteredFrameworks}
                        disabled={disabled}
                    />
                </Grid>
                <Grid sm={4} md={3} display="flex" justifyContent="space-between" alignItems="center">
                    <AutoCompleteFilter
                        label='libraries'
                        options={libraries}
                        setFilteredOptions={setFilteredLibraries}
                        disabled={disabled}
                    />
                </Grid>


                {apiProjects.map((project, index) => (

                    shouldShowProjectCard(project.languages, project.libraries, project.frameworks) &&
                    <Grid xs={12} sm={6} md={4} lg={4} key={index}>
                        <ProjectCard project={project} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Projects;
