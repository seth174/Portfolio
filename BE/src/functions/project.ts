import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from "@azure/functions";

const cosmosInput = input.cosmosDB({
    databaseName: 'portfolio',
    collectionName: 'Projects',
    id: '4962025d-98b2-4dd0-8110-3638cd0a5f43',
    partitionKey: 'b6697ec8-79cd-4d6a-ad33-e2ffcfbe191d',
    connectionStringSetting: 'CosmosDBConnection',
});

interface Project {
    id: string;
    projectId: string;
    languages: string;
    frameworks: string;
    title: string;
    description: string;
    imageURL: string;
}

export async function GetProjects(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}! integrated` };
};

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const project = <Project>context.extraInputs.get(cosmosInput);
    if (!project) {
        return {
            status: 404,
            body: 'project item not found',
        };
    } else {
        return {
            body: JSON.stringify(project),
        };
    }
}

app.http('GetProjects', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetProjects
});

app.http('GetProjects2', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetProjects
});

app.http('GetProjects3', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: GetProjects
});

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    handler: httpTrigger1,
});
