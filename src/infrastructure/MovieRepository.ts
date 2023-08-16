import { Collection } from 'mongodb';
import Movies from "../models/MoviesModel";
import Repository from "./Repository";
import { ObjectId } from 'mongodb';

class MovieRepository {
    private db: Repository | undefined;
    private collection: Collection | undefined

    constructor() {
        this.db = undefined
        this.inicializar()
    }

    async inicializar() {
        this.db = await Repository.getInstance()
        this.collection = this.db?.getCollection('Users')
    }

    /**
     * 
     * @param id string UUID
     * @returns if id is´nt empty return one movie else return all movies[]  or return error 
     */
    async get(id: string = ""): Promise<any> {
        try {
            let ids = id !== "" ? { _id: new ObjectId(id) } : {}
            return await this.collection?.find(ids).toArray();
        } catch (e) {
            return { message: String(e) }
        }

    }
}

export default MovieRepository