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

console.log("JELLOIS");


async function main() {
    // The rest of the README samples are designed to be pasted into this function body
    const { database } = await client.databases.createIfNotExists({ id: 'portfolio' });
    const { container } = await database.containers.createIfNotExists({ id: 'Blogs' });

    const blogs = [
        {
            id: uuidv4(),
            BlogId: uuidv4(),
            title: "Consulting vs Tech: The Trade-offs of Different Career Paths",
            content: "Full content to be written...",
            summary: "Having worked in both consulting and tech roles, I've experienced firsthand how each path presents its own unique challenges and rewards. In consulting, I deeply miss the constant opportunity to meet new people and explore different industries and problem spaces. Every project brought fresh faces, new domains, and diverse challenges that kept the work exciting and dynamic. However, since transitioning to tech, I've noticed a significant sharpening of my technical skills. The focused environment allows for deeper dives into complex problems, more time to master specific technologies, and the ability to build expertise that consulting's rapid context-switching sometimes prevented. Consulting taught me adaptability and communication, while tech has honed my technical depth. Both paths have their merits, and the choice often comes down to what you value most: breadth and variety, or depth and specialization.",
            author: "Seth",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            comments: [],
            likes: 0,
            imageURL: "https://images.pexels.com/photos/28933961/pexels-photo-28933961.jpeg"
        },
        // {
        //     id: uuidv4(),
        //     BlogId: uuidv4(),
        //     title: "Building Custom Tooling: When It Works and When It Doesn't",
        //     content: "Full content to be written...",
        //     summary: "Custom tooling can be a powerful competitive advantage, but only when organizations are truly prepared to invest the necessary resources and have a genuine use case that justifies the effort. When done right, with dedicated teams managing the tools and proper investment in maintenance and evolution, custom solutions can work exceptionally well. They can be tailored precisely to your organization's needs, integrate seamlessly with your workflows, and provide capabilities that off-the-shelf solutions simply can't match. However, I've witnessed teams that didn't take custom tooling seriously enough, treating it as a side project or failing to allocate proper resources. This approach inevitably costs them dearly—tools become outdated, bugs accumulate, documentation is missing, and the team ends up worse off than if they had stuck with commercial solutions. The key is honest assessment: do you have the commitment and resources to build and maintain this properly? If not, it's better to choose a proven third-party solution.",
        //     author: "Seth",
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     comments: [],
        //     likes: 0,
        //     imageURL: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg"
        // },
        // {
        //     id: uuidv4(),
        //     BlogId: uuidv4(),
        //     title: "The Single Point of Human Failure: Knowledge Bottlenecks in Organizations",
        //     content: "Full content to be written...",
        //     summary: "In every organization I've been part of, there's inevitably one person who controls way too much knowledge, creating a critical bottleneck that can bring work to a grinding halt. This individual becomes the gatekeeper for critical information, processes, or systems, and when they're unavailable—whether due to vacation, illness, or departure—the entire team struggles to accomplish meaningful work. The problem isn't necessarily the person themselves, but rather the organizational structure that allows such concentration of knowledge. When that person is away, questions go unanswered, decisions get delayed, and projects stall. I've seen teams spend days waiting for someone's return just to move forward on tasks that should have been straightforward. The solution requires intentional knowledge sharing: documentation, cross-training, pair programming, and creating systems that distribute critical knowledge across multiple team members. Organizations need to recognize this risk early and actively work to prevent knowledge silos from forming in the first place.",
        //     author: "Seth",
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     comments: [],
        //     likes: 0,
        //     imageURL: "https://images.pexels.com/photos/8378752/pexels-photo-8378752.jpeg"
        // },
        // {
        //     id: uuidv4(),
        //     BlogId: uuidv4(),
        //     title: "Why Azure DevOps Pipelines is My Favorite CI/CD Technology",
        //     content: "Full content to be written...",
        //     summary: "After working with Tekton, Travis CI, and Jenkins, Azure DevOps Pipelines has emerged as my clear favorite CI/CD solution. What sets it apart is reliability—it consistently works when I need it to, without the frustrating bugs and edge cases I've encountered with other platforms. The auditing capabilities are excellent, providing clear visibility into pipeline runs, changes, and deployments, which is crucial for compliance and troubleshooting. While no tool is perfect, Azure DevOps rarely bugs out or fails in unexpected ways. There are occasional moments where the UI doesn't update immediately, but this is a minor inconvenience compared to the stability issues I've faced elsewhere. The tooling ecosystem around Azure DevOps is comprehensive and well-integrated, making it easy to build complex pipelines that integrate with other Azure services seamlessly. For teams looking for a solid, reliable CI/CD solution that just works, Azure DevOps Pipelines is an excellent choice that balances power, reliability, and ease of use.",
        //     author: "Seth",
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     comments: [],
        //     likes: 0,
        //     imageURL: "https://images.pexels.com/photos/10142683/pexels-photo-10142683.jpeg"
        // }
    ];
    console.log("HERE!");

    blogs.forEach(async blog => {
        console.log(`Creating for ${blog.title}`);
        await container.items.create(blog);
    });

}

main().catch((error) => {
    console.error(error);
});
