// In order to run this file run the following commands
// Create a .env file and add AZURE_COSMO_ENDPOINT and AZURE_COSMO_KEY
// npx tsc
// InsertProjectData.js [endpoint] [key] 

import { CosmosClient } from "@azure/cosmos";
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env' }); // Specify your custom .env file here

const endpoint = process.env.AZURE_COSMO_ENDPOINT!;
const key = process.env.AZURE_COSMO_KEY!;
const client = new CosmosClient({ endpoint, key });


async function main() {
    // The rest of the README samples are designed to be pasted into this function body
    const { database } = await client.databases.createIfNotExists({ id: 'portfolio' });
    const { container } = await database.containers.createIfNotExists({ id: 'Projects' });

    const projects = [
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Java', 'Typescript'],
            frameworks: ['Spring Boot', 'React'],
            libraries: ['Stripe', 'Project Reactor', 'Zendesk', 'Segment'],
            title: 'Autonation',
            description: `I worked as a backend developer on a Greenfield online car leasing application that allows users to lease cars remotely. I integrated various libraries, including Stripe, Zendesk, Contentful, Braze, and Segment, into the system. The backend was developed using Spring Boot, with the frontend built in React. Our agile development team spanned three continents, iterating and adjusting the tool's features each sprint.`,
            imageURL: 'https://th.bing.com/th/id/OIG3.RvsTAsATqdXe49lSGBHU?w=270&h=270&c=6&r=0&o=5&pid=ImgGn',
            link: 'https://www.autonationmobility.com',
            sortOrder: 1
        },
        {

            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Typescript'],
            frameworks: ['React', 'Express JS'],
            libraries: ['Material UI'],
            title: 'WM AI ChatBot',
            description: 'This project is an AI-powered chatbot integrated with ChatGPT, designed to boost the efficiency of thousands of employees. Developed entirely in TypeScript, it features a React front end and an Express.js back end, all organized within a monorepo structure. The application is hosted on Azure App Service and leverages an Azure Function for document-to-text conversion, supported by an Azure SQL Database. It also implements Retrieval-Augmented Generation (RAG) for enhanced document search functionality and uses GitHub Actions for CI/CD automation.',
            imageURL: 'https://th.bing.com/th/id/OIG4.HYXNHm6EKVSRnyXXl1mU?cb=13&pid=ImgGn',
            link: 'https://www.westmonroe.com/press-releases/west-monroe-introduces-internal-ai-powered-platform',
            sortOrder: 2

        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Typescript', 'C#'],
            frameworks: ['.NET Core', 'Angular'],
            libraries: [],
            title: 'Custom Deployment Application',
            description: 'I developed a web-based deployment tool that streamlined the management of single-tenant applications within Azure DevOps pipelines. This tool allowed product owners to deploy, add, or remove client applications without requiring any code changes, significantly enhancing operational efficiency. It supported seamless deployment of various Microsoft technologies, including .NET MVC, SQL Server databases, SSRS, SSIS, and more. The tool featured a robust backend built in C# .NET and a responsive frontend developed using Angular and TypeScript.',
            imageURL: 'https://th.bing.com/th/id/OIG3.wQv6lHPZS_AD5s._1PIB?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn',
            sortOrder: 5
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Ruby'],
            frameworks: ['Ruby on Rails'],
            libraries: ['Finnhub'],
            title: 'Stock Managment Application',
            description: 'I developed a robust stock portfolio management tool that empowers users to manage their investments efficiently. The application enables users to buy and sell stocks, view detailed stock summaries, and analyze their holdings with ease. Built using Ruby on Rails and backed by a PostgreSQL database, the tool offers a seamless and reliable experience. Additionally, it was successfully deployed on Heroku, ensuring scalability and accessibility for users. This project highlights my ability to deliver full-stack web solutions that meet real-world financial needs.',
            imageURL: 'https://th.bing.com/th/id/OIG4.aatssLfaqdAqAFD7DjjD?cb=13&w=1024&h=1024&rs=1&pid=ImgDetMain',
            link: 'https://github.com/seth174/Rails-Trading-Web-App',
            sortOrder: 6
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Java', 'Typescript'],
            frameworks: ['Spring Boot', 'React'],
            libraries: ['Project Reactor', 'Open AI', 'Gemini', 'Dynamo DB', 'Material UI'],
            title: 'Sharing The AI',
            description: 'As a skilled software engineer, I developed a full-stack application that enables users to share AI-powered chat conversations. The backend is built with Spring Boot microservices, seamlessly integrating with DynamoDB for efficient data storage and various AI APIs to enhance functionality. The front end, developed in React, provides a responsive and intuitive user interface. The project is hosted on AWS LightSail, ensuring reliable performance, and leverages Azure DevOps for streamlined CI/CD, showcasing my ability to manage cloud infrastructure and maintain robust deployment pipelines.',
            imageURL: 'https://th.bing.com/th/id/OIG4.BfjOjx_kRXCSUzXqImhH?cb=13&pid=ImgGn',
            link: 'https://sharing-the-ai.com',
            sortOrder: 3
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Typescript'],
            frameworks: ['React'],
            libraries: ['Material UI'],
            title: 'Portfolio Website',
            description: 'This portfolio website highlights my expertise as a software engineer, showcasing key projects and accomplishments alongside a blog where I share insights from my journey in the tech industry. The site is built with a React frontend that integrates with an Azure Function App API and is supported by an Azure Cosmos DB for database management. The frontend is hosted on Azure App Services, with all deployments orchestrated through GitHub CI/CD pipelines. This setup reflects my proficiency in modern web development, cloud technologies, and scalable database solutions.',
            imageURL: 'https://th.bing.com/th/id/OIG4.SayFjn.9wYFyy2UVguyx?cb=13&pid=ImgGn',
            link: 'https://github.com/seth174/Portfolio',
            sortOrder: 4
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Python'],
            frameworks: [],
            libraries: ['PyGame'],
            title: '2048 Game',
            description: `As a passionate software engineer, I developed a fully functional 2048 game using Python and Pygame, showcasing my ability to build engaging and interactive applications. To enhance the game's functionality, I integrated the NumPy library, allowing for efficient storage and manipulation of the game state. This project demonstrates my proficiency in Python, my understanding of game development principles, and my ability to incorporate data management solutions to optimize performance.`,
            imageURL: 'https://th.bing.com/th/id/OIG1.mbBcW.2tyl7qqYwlzeZM?w=270&h=270&c=6&r=0&o=5&cb=13&dpr=2&pid=ImgGn',
            link: 'https://github.com/seth174/2048-game',
            sortOrder: 8
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['C#'],
            frameworks: ['Hot Chocolate'],
            libraries: [],
            title: 'GraphQL API',
            description: `I spearheaded the design and implementation of a GraphQL endpoint using C# and the Hot Chocolate framework, leading a team of two interns. This project expanded on an existing REST API, enhancing its capabilities by providing more efficient and flexible data operations through GraphQL. By guiding the interns, I ensured the seamless integration of the new endpoint, which supported comprehensive CRUD operations while significantly improving data querying efficiency and developer experience. My leadership in this initiative not only delivered a robust technical solution but also fostered the growth of the interns' skills and confidence.`,
            imageURL: 'https://th.bing.com/th/id/OIG3.49KDNohVCZohAm1uYQVR?w=270&h=270&c=6&r=0&o=5&cb=13&dpr=2&pid=ImgGn',
            sortOrder: 7
        },
    ];

    projects.forEach(async project => {
        await container.items.create(project);
    });

}

main().catch((error) => {
    console.error(error);
});
