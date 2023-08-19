import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const USERDB = process.env.USERDB
const PASSWORLD = process.env.PASSWORLD
const DBNAME = process.env.DBNAME
const AGENT = process.env.AGENT
const HOST = process.env.HOST
//
const URI = `${AGENT}://${USERDB}:${PASSWORLD}@${HOST}`

class Repository {
    private static instance: Repository
    private client: MongoClient;
    private db: Db | undefined = undefined

    constructor() {
        this.client = new MongoClient(URI)
        try {
            this.client.connect();
            this.db = this.client.db(DBNAME);
            console.log('Conexión a MongoDB establecida');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            this.db = undefined
        }
    }
    /**
     * 
     * @param collection name of collection
     * @returns a mongo collection
     */
    public getCollection(collection: string) {
        const collectionGet = this.db?.collection(collection);
        console.log('coleccionget::', collection)
        return collectionGet
    }
}

export default Repository