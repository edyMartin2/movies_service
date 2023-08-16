import { ObjectId } from "mongodb";
import MovieRepository from "../infrastructure/MovieRepository";
const moviesRp = new MovieRepository()
import Movies from "../models/MoviesModel";
class MoviesApplication {

    /**
     * get all movies with this
     * @returns Movies[]
     */
    async findAll(): Promise<Movies> {
        const movies: Movies = await moviesRp.get()
        return movies
    }

    /**
     * get one movie with this
     * @param id UUID 
     * @returns Movies
     */
    async findById(id: string) {
        const movies = await moviesRp.get(id)
        return movies
    }

    /**
     * create one movie with this
     * @param Movie 
     * @returns 
     */
    async create(Movie: Movies) {
        const save_movie = await moviesRp.post(Movie)
        return save_movie
    }

    /**
     * 
     * @param id 
     * @param Movie 
     * @returns 
     */
    async update(id: ObjectId, Movie: Movies) {
        const update_movie = await moviesRp.update(id, Movie)
        return update_movie
    }

    async delete(id: ObjectId){
        const delete_movie = await moviesRp.delete(id)
        return delete_movie
    }
}

export default MoviesApplication