import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import Project from '../models/Projects';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const handleURLClick = (url: string) => {
        window.open(url, '_blank');
    };

    const combinedArray: string[] = [...project.frameworks, ...project.languages];

    return (
        <Card sx={{ height: '100%' }}>
            <CardMedia
                component="img"
                alt={project.title}
                height="140"
                width="100%"
                image={project.imageURL}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {project.description}
                </Typography>
                <Box marginTop={'40px'} display="flex" justifyContent="space-between" flexWrap="wrap">
                    {combinedArray.map((item, index) => (
                        <Box
                            key={index}
                            border="2px solid black"
                            borderRadius={'10px'}
                            p={1}
                            mb={1} // optional: adds margin between boxes
                            flex="1 1 30%" // ensures boxes wrap nicely
                            maxWidth="30%" // ensures boxes don't exceed a certain width
                        >
                            <Typography variant="body2" color="text.primary">
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
            <CardActions>
                {project.link && (
                    <Button size="small" onClick={() => handleURLClick(project.link)}>
                        View Project
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProjectCard;
