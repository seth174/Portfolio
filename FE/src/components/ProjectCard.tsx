import React from 'react';
import Project from '../models/Projects';
import CustomCard from './CustomCard';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
