import { Client, Databases, Functions } from 'appwrite';


const client = new Client();

export const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT
export const PROJECT = import.meta.env.VITE_PROJECT_ID
export const DEV_DB_ID = import.meta.env.VITE_DB_ID
export const VITE_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_THREADS

client
    .setEndpoint(VITE_ENDPOINT)
    .setProject(PROJECT);


export const functions = new Functions(client)
export const database = new Databases(client)
export default client;