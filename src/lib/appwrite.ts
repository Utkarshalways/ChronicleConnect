import { Client, Account, Databases, Query,Storage, ID } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error("Missing Appwrite env variables!");
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);


  
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);



export { client, account, databases,Query,storage,ID };