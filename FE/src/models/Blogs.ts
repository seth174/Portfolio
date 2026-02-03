export interface Blog {
    imageURL: string,
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

export interface Comment {
    CommentId: string,
    createdAt: string,
    comment: string,
    ipAddress: string,
}