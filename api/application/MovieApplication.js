"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MovieRepository_1 = __importDefault(require("../infrastructure/MovieRepository"));
const moviesRp = new MovieRepository_1.default();
class MoviesApplication {
    /**
     * get all movies with this
     * @returns Movies[]
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield moviesRp.get();
            return movies;
        });
    }
    /**
     * get one movie with this
     * @param id UUID
     * @returns Movies
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield moviesRp.get(id);
            return movies;
        });
    }
    /**
     * create one movie with this
     * @param Movie
     * @returns
     */
    create(Movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const save_movie = yield moviesRp.post(Movie);
            return save_movie;
        });
    }
    /**
     *
     * @param id
     * @param Movie
     * @returns
     */
    update(id, Movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const update_movie = yield moviesRp.update(id, Movie);
            return update_movie;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const delete_movie = yield moviesRp.delete(id);
            return delete_movie;
        });
    }
}
exports.default = MoviesApplication;
