import { Client, Databases, Functions, Storage, Account } from 'appwrite';


const client = new Client();

export const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT
export const PROJECT = import.meta.env.VITE_PROJECT_ID
export const DEV_DB_ID = import.meta.env.VITE_DB_ID
export const VITE_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_THREADS
export const BUCKET_ID_IMAGES = import.meta.env.VITE_BUCKET_ID
export const COLLECTION_ID_PROFILES = '64d4daff0b38fbc23fe0'


client
    .setEndpoint(VITE_ENDPOINT)
    .setProject(PROJECT);


export const account = new Account(client)
export const functions = new Functions(client)
export const database = new Databases(client)
export const storage = new Storage(client)

export default client;
