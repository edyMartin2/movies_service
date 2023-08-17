import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';
// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const USERDB = process.env.USERDB
const PASSWORLD = process.env.PASSWORLD
const DBNAME = process.env.DBNAME
const AGENT = process.env.AGENT
const HOST = process.env.HOST
const PORT = process.env.PORT
//
const URI = `${AGENT}://${USERDB}:${PASSWORLD}@${HOST}:${PORT}`
/**
 * SINGLETON CLASS
 */


class Repository {
    private static instance: Repository
    private client: MongoClient;
    private db: Db | undefined = undefined

    private constructor() {
        this.client = new MongoClient(URI)
        console.log('---->', URI, "mongodb://root:1234@localhost:27017")
    }

    /**
     * 
     * @returns an instance of this class if exist else create a new instance
     */
    static async getInstance(): Promise<Repository> {
        if (!this.instance) {
            this.instance = new Repository();
            await this.instance.connect();
            return this.instance
        } else if (this.instance.db !== undefined) {
            return this.instance;
        }
        else {
            await this.instance.connect();
            return this.instance
        }

    }

    private async connect() {
        console.log('entramos al connect ', this.db === undefined ? 'vacia' : this.db)
        try {
            await this.client.connect();
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

    static getDb() {
        return this.instance.db
    }
}

export default Repository