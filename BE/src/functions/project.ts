import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function GetProjects(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}! integrated` };
};

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