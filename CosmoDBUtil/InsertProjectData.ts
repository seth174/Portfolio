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

    const project = {
        id: uuidv4(),
        projectId: uuidv4(),
        languages: ['java', 'typescript'],
        frameworks: ['spring boot', 'react'],
        title: 'Autonation',
        description: 'worked on a project with Autonation',
        imageURL: 'https://www.autonationmobility.com/images/og/og-facebook-pink.jpg'
    };

    await container.items.create(project);
}

main().catch((error) => {
    console.error(error);
});