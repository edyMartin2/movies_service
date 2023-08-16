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
}

export default MoviesApplication