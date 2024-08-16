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
        // {
        //     id: uuidv4(),
        //     ProjectId: uuidv4(),
        //     languages: ['java', 'typescript'],
        //     frameworks: ['spring boot', 'react'],
        //     libraries: ['Stripe', 'Project Reactor'],
        //     title: 'Autonation Project',
        //     description: 'worked on a project with Autonation',
        //     imageURL: 'https://www.autonationmobility.com/images/og/og-facebook-pink.jpg',
        //     link: 'https://www.autonationmobility.com'
        // },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['typescript'],
            frameworks: ['react', 'Express JS'],
            title: 'WM AI ChatBot',
            description: 'worked on an AI chatbot used internally within the company',
            imageURL: 'https://th.bing.com/th/id/OIG4.HYXNHm6EKVSRnyXXl1mU?pid=ImgGn',
            link: 'someurl'
        },
        {
            id: uuidv4(),
            ProjectId: uuidv4(),
            languages: ['Typescript', 'C#'],
            frameworks: ['.NET Core', 'Angular'],
            title: 'Custom Deployment Application',
            description: 'Built a project that helped a company with CI/CD deployments',
            imageURL: 'https://th.bing.com/th/id/OIG3.wQv6lHPZS_AD5s._1PIB?w=270&h=270&c=6&r=0&o=5&dpr=2&pid=ImgGn',
            link: 'someurl'
        },
        // {
        //     id: uuidv4(),
        //     ProjectId: uuidv4(),
        //     languages: ['java', 'typescript'],
        //     frameworks: ['spring boot', 'react'],
        //     title: 'Test Project',
        //     description: 'worked on a project with Test Project',
        //     imageURL: 'https://www.autonationmobility.com/images/og/og-facebook-pink.jpg',
        //     link: 'someurl'
        // },
        // {
        //     id: uuidv4(),
        //     ProjectId: uuidv4(),
        //     languages: ['java', 'typescript'],
        //     frameworks: ['spring boot', 'react'],
        //     title: 'Test Project',
        //     description: 'worked on a project with Test Project',
        //     imageURL: 'https://www.autonationmobility.com/images/og/og-facebook-pink.jpg',
        //     link: 'someurl'
        // },
        // {
        //     id: uuidv4(),
        //     ProjectId: uuidv4(),
        //     languages: ['java', 'typescript'],
        //     frameworks: ['spring boot', 'react'],
        //     title: 'Test Project',
        //     description: 'worked on a project with Test Project',
        //     imageURL: 'https://www.autonationmobility.com/images/og/og-facebook-pink.jpg',
        //     link: 'someurl'
        // },
    ];

    projects.forEach(async project => {
        await container.items.create(project);
    });

}

main().catch((error) => {
    console.error(error);
});
