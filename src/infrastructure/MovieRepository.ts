import Movies from "../models/MoviesModel";
import Repository from "./Repository";


class MovieRepository {
    
    async get () : Promise<Movies | any > {
        const db  = await Repository.getInstance()
        const collection = db.getCollection()
        return {
            name: "",
            comments: ""
        }
    }
}