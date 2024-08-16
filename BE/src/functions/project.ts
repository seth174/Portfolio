import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from "@azure/functions";

// const cosmosInput = input.cosmosDB({
//     databaseName: 'portfolio',
//     containerName: 'Projects',
//     id: '{Query.id}',
//     partitionKey: '{Query.partitionKey}',
//     connection: 'CosmosDB2',
// });

const cosmosInputGetAllProjects = input.cosmosDB({
    databaseName: 'portfolio',
    containerName: 'Projects',
    sqlQuery: 'select * from c',
    connection: 'CosmosDB2',
});

interface Project {
    id: string;
    projectId: string;
    languages: string[];
    frameworks: string[];
    title: string;
    description: string;
    imageURL: string;
}

export async function GetProjects(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const projects = <Project[]>context.extraInputs.get(cosmosInputGetAllProjects);

    if (projects.length == 0) {
        return {
            status: 404,
            body: 'No Projects found',
        };
    } else {
        return {
            body: JSON.stringify(projects),
        };
    }
}

app.http('GetProjects', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInputGetAllProjects],
    handler: GetProjects
});
