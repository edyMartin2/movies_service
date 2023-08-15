import { MongoClient, Db } from 'mongodb';

class Repository {
    private static instance: Repository
    private client: MongoClient;
    private db: Db | undefined = undefined

    private constructor() {
        this.client = new MongoClient('mongodb://root:1234@localhost:27017')
    }

    static async getInstance(): Promise<Repository> {
        if (!this.instance) {
            this.instance = new Repository();
            await this.instance.connect();
            return this.instance
        }
        return this.instance;
    }

    public async getCollection(collection: string) {
        this.db?.collection(collection);

    }
    private async connect() {
        try {
            await this.client.connect();
            this.db = this.client.db('movies');
            console.log('Conexión a MongoDB establecida');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            this.db = undefined
        }
    }
}

export default Repository