// components/Home.tsx
import { Card, CardContent, Container, Divider, Typography } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Introduction
                    </Typography>
                    <Typography paragraph>
                        Hello, I’m Seth, a dedicated software engineer based in Seattle, WA, with a passion for advancing technology and tackling complex challenges. With a Bachelor of Arts in Computer Science and Hispanic Studies from DePauw University, I graduated with a GPA of 3.90/4.00, which reflects my commitment to academic excellence and technical proficiency. My educational journey included rigorous coursework in Databases, Object-Oriented Software Development, Web Programming and Cybersecurity, and Mobile Development (Android), which laid a strong foundation for my career.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Technical Skills and Expertise
                    </Typography>
                    <Typography paragraph>
                        Over the years, I’ve developed a diverse skill set that spans various programming languages, frameworks, and technologies. I am proficient in Java, JavaScript, TypeScript, and C#, and have hands-on experience with frameworks like Spring Boot, Express, React, and .NET. My database experience includes PostgreSQL, Oracle, MSQL, and DynamoDB. Additionally, I hold an AWS Cloud Practitioner certification and am fluent in both English and Spanish, which enhances my ability to work in diverse and international environments.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Professional Experience
                    </Typography>
                    <Typography paragraph>
                        I currently serve as a Software Engineer II at West Monroe Partners in Seattle, WA. Since joining the company in July 2022, I’ve been instrumental in developing a greenfield application for AutoNation Mobility, which facilitates online car leasing through integrations with Zendesk, Stripe, Segment, and other software. This project involved primarily backend work with Spring Boot microservices, successfully scaling the application to support thousands of users.
                    </Typography>
                    <Typography paragraph>
                        In another significant role, I contributed to the creation of a Generative AI chatbot with features like a prompt library and document chat, powered by Retrieval Augmented Generation (RAG). This project utilized Express JS for the backend and React for the frontend, with deployment on Azure app services through GitHub Actions CI/CD.
                    </Typography>
                    <Typography paragraph>
                        I also led a cross-functional team in refactoring Azure classic, Octopus, and GitLab pipelines to Azure YAML pipelines, which facilitated a seamless transition from on-premise to cloud infrastructure. This effort standardized deployment processes, enhanced maintainability, and ensured continuity with the new pipelines.
                    </Typography>
                    <Typography paragraph>
                        Prior to my current role, I interned at Level Data, where I streamlined K-12 education data management by integrating various applications across multiple school districts. My responsibilities included troubleshooting and transferring data between disparate systems using databases, REST APIs, plugins, CSV files, SFTPs, and servers.
                    </Typography>
                    <Typography paragraph>
                        Additionally, I served as a Computer Science Tutor at DePauw University, assisting beginner students with fundamental coding concepts in a hybrid classroom setting.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Personal Side Projects
                    </Typography>
                    <Typography paragraph>
                        Beyond my professional work, I am passionate about personal projects that push the boundaries of technology. One of my notable side projects is “Sharing the AI,” where I engineered a React front-end integrated with Spring Boot microservices to interact with OpenAI’s Chat endpoint for sharing AI conversations. This project also involved orchestrating CI/CD deployments via Azure DevOps Pipeline, targeting AWS Lightsail with a registered domain.
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Looking Forward
                    </Typography>
                    <Typography paragraph>
                        As I look to level up my career, I am eager to take on new challenges and opportunities that will allow me to further develop my skills and contribute to innovative projects. My goal is to leverage my technical expertise and experience to make a significant impact in the tech industry and continue growing as a software engineer.
                    </Typography>
                    <Typography paragraph>
                        Feel free to connect with me on my <a href="https://www.linkedin.com/in/seth-fagen-614648162/" target="_blank" rel="noopener noreferrer">linkedin profile</a> or visit my <a href="https://github.com/seth174" target="_blank" rel="noopener noreferrer">GitHub profile</a> for more information about my work.
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Home;