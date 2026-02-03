import { app, HttpRequest, HttpResponseInit, input, InvocationContext, output } from "@azure/functions";
import { v4 as uuidv4 } from 'uuid';

const DATABSE_NAME = 'portfolio';
const CONTAINER_NAME = 'Blogs';
const CONNECTION = 'CosmosDB2';
const ONE_HOUR_MILI = 1 * 60 * 60 * 1000;

const cosmosInputGetAllBlogs = input.cosmosDB({
    databaseName: DATABSE_NAME,
    containerName: CONTAINER_NAME,
    sqlQuery: 'select * from b',
    connection: CONNECTION,
});

const cosmosInputGetBlogByIdAndPartitionKey = input.cosmosDB({
    databaseName: DATABSE_NAME,
    containerName: CONTAINER_NAME,
    partitionKey: '{partitionKeyValue}',
    id: '{id}',
    connection: CONNECTION,
});

const cosmoOuptut = output.cosmosDB({
    databaseName: DATABSE_NAME,
    containerName: CONTAINER_NAME,
    createIfNotExists: false,
    connection: CONNECTION,
    partitionKey: '{partitionKeyValue}'
});

interface BlogWithMetadata extends Blog {
    _rid: string;          // System-generated fields
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

interface Blog {
    id: string,
    BlogId: string,
    title: string,
    content: string,
    summary: string,
    author: string,
    createdAt: string,
    updatedAt: string,
    comments: Comment[],
    likes: number
}

interface Comment {
    CommentId: string,
    createdAt: string,
    comment: string,
    ipAddress: string,
}

export async function GetAllBlogs(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const blogs = <BlogWithMetadata[]>context.extraInputs.get(cosmosInputGetAllBlogs);
    if (blogs.length == 0) {
        return {
            status: 404,
            body: 'No blogs found',
        };
    } else {
        const filteredBlogs = mapBlogs(blogs);
        return {
            body: JSON.stringify(filteredBlogs),
        };
    }
}

export async function GetBlogByIdAndPartitionKey(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const blog = <BlogWithMetadata>context.extraInputs.get(cosmosInputGetBlogByIdAndPartitionKey);
    console.log(blog)
    if (blog === undefined) {
        return {
            status: 404,
            body: `No blog found with partition key and id`,
        };
    } else {
        const filteredBlogs = mapBlogs([blog]);
        return {
            // body: JSON.stringify(filteredBlogs[0]),
            body: JSON.stringify(filteredBlogs[0])
        };
    }
}

export async function InsertCommentOnPost(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const blog = <BlogWithMetadata>context.extraInputs.get(cosmosInputGetBlogByIdAndPartitionKey);
    console.log(+blog.comments[blog.comments.length - 1].createdAt - Date.now() > ONE_HOUR_MILI)
    if (blog === undefined) {
        return {
            status: 404,
            body: `No blog found with partition key and id`,
        };
    } else if (blog.comments.length > 0 && Date.now() - +blog.comments[blog.comments.length - 1].createdAt < ONE_HOUR_MILI) {
        return {
            status: 409,
            body: `Too many comments in 1 hour`,
        };
    }

    const requestBody = await request.json() as any;


    if (requestBody === null || requestBody.comment == null || requestBody.comment.length === 0 || requestBody.comment.length > 1000) {
        return {
            status: 400,
            body: `Comment validation failed`,
        };
    } else {
        const newComment: Comment = {
            CommentId: uuidv4(),
            createdAt: Date.now().toString(),
            comment: requestBody.comment,
            ipAddress: 'someAddress'
        }
        blog.comments.push(newComment);
        context.extraOutputs.set(cosmoOuptut, blog);
        return {
            status: 201,
        };
    }
}

function mapBlogs(blogs: BlogWithMetadata[]): Blog[] {
    const filteredBlogs: Blog[] = blogs.map(({ _rid, _self, _etag, _attachments, _ts, ...blog }) => blog);
    return filteredBlogs;
}

app.http('Blogs', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInputGetAllBlogs],
    handler: GetAllBlogs
});

app.http('Blog', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'Blog/{partitionKeyValue}/{id}',
    extraInputs: [cosmosInputGetBlogByIdAndPartitionKey],
    handler: GetBlogByIdAndPartitionKey
});

app.http('BlogInsertComment', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'Blog/{partitionKeyValue}/{id}/comment',
    extraInputs: [cosmosInputGetBlogByIdAndPartitionKey],
    extraOutputs: [cosmoOuptut],
    handler: InsertCommentOnPost
});
