import Movies from "../models/MoviesModel"
export default interface responseAllMovies {
    movies: Movies
    pages: number | undefined
}