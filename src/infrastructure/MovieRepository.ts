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
        this.collection = this.db?.getCollection('Movies')
        //console.log('soy movie', this.db)
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


    /**
     * @param Movie movie
     * @returns responseMongoMovie |  error
     */
    async post(Movie: Movies): Promise<any> {
        try {
            return await this.collection?.insertOne(Movie)
        } catch (e) {
            return { message: String(e) }
        }
    }

    /**
     * @param id 
     * @param Movie 
     */
    async update(id: ObjectId, Movie: Movies) {
        try {
            return await this.collection?.updateOne(id, Movie)
        } catch (e) {
            return { message: String(e) }
        }
    }


    async delete(id: ObjectId) {
        try {
            return await this.collection?.deleteOne({ _id: new ObjectId(id) })
        } catch (e) {
            return { message: String(e), id }
        }
    }
}

export default MovieRepository