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
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const MovieApplication_1 = __importDefault(require("./application/MovieApplication"));
const PlataformApplication_1 = __importDefault(require("./application/PlataformApplication"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
const moviesRp = new MovieApplication_1.default();
const plataformRP = new PlataformApplication_1.default();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//  ******************* Movies ************************
/**
 * endpoint / for get all movies
 */
app.get('/movies', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield moviesRp.findAll();
    res.json(movies);
}));
/**
 * endpoint /movies/:id for get one movie
 */
app.get('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const movie = yield moviesRp.findById(id);
    res.json(movie);
}));
/**
 * endpoint /movies for create one movie
 */
app.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const save_movie = yield moviesRp.create(body);
    res.json(save_movie);
}));
/**
 * endpoint /movies/:id for update one movie
 */
app.post('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongodb_1.ObjectId(req.params.id);
    const body = req.body;
    const update_movie = yield moviesRp.update(id, body);
    res.json(update_movie);
}));
/**
 * endpoint /movies/:id for delete one movie
 */
app.delete('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongodb_1.ObjectId(req.params.id);
    console.log(id);
    const delete_movie = yield moviesRp.delete(id);
    res.json(delete_movie);
}));
//  ******************* Plataforms ************************
/**
 * endpoint /platforms for get all plataforms
 */
app.get('/plataforms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plataform = yield plataformRP.findAll();
    console.log('respuesta de pla', plataform);
    res.json(plataform);
}));
/**
 * endpoint /plataforms/:id for get one plataform
 */
app.get('/plataforms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const plataform = yield plataformRP.findById(id);
    res.json(plataform);
}));
/**
 * endpoint /movies for create one movie
 */
app.post('/plataforms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const save_movie = yield plataformRP.create(body);
    res.json(save_movie);
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Running in port : ${PORT}`);
});
