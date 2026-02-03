import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import Project from '../models/Projects';
import CustomCard from './CustomCard';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const handleURLClick = (url: string) => {
        window.open(url, '_blank');
    };

    const combinedArray: string[] = [...project.frameworks, ...project.languages, ...project.libraries];

    return (
        <CustomCard
            combinedArray={combinedArray}
            title={project.title}
            imageUrl={project.imageURL}
            description={project.description}
            link={project.link}
            isProject={true}
        />
    );
};

export default ProjectCard;
