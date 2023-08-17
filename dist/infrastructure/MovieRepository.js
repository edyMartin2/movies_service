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
const Repository_1 = __importDefault(require("./Repository"));
const mongodb_1 = require("mongodb");
const PlataformRepository_1 = __importDefault(require("./PlataformRepository"));
const plataformRepository = new PlataformRepository_1.default();
class MovieRepository {
    constructor() {
        this.db = undefined;
        this.inicializar();
    }
    inicializar() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield Repository_1.default.getInstance();
            this.collection = (_a = this.db) === null || _a === void 0 ? void 0 : _a.getCollection('Movies');
        });
    }
    /**
     *
     * @param id string UUID
     * @returns if id is´nt empty return one movie else return all movies[]  or return error
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(id = "") {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = id !== "" ? { _id: new mongodb_1.ObjectId(id) } : {};
                const movies = yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.find(ids).toArray());
                const movies_platform = movies === null || movies === void 0 ? void 0 : movies.map((i) => __awaiter(this, void 0, void 0, function* () {
                    const platform = i.platforms;
                    const platformInfo = yield Promise.all(yield platform.map((p) => __awaiter(this, void 0, void 0, function* () {
                        const platformInfo = yield plataformRepository.get(String(p._id)).then(res => { return res; });
                        return platformInfo[0];
                    })));
                    const data = Object.assign(Object.assign({}, i), { platforms: platformInfo });
                    return data;
                    return platformInfo;
                }));
                const movies_to_platform = movies_platform !== undefined ? yield Promise.all(movies_platform) : [];
                const filtro = movies_to_platform.filter(e => e !== undefined);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const filtro_unidim = filtro.flat();
                // Elimina duplicados basados en la propiedad "_id"
                const arregloSinDuplicados = this.eliminarDuplicados(filtro_unidim, '_id');
                return arregloSinDuplicados;
            }
            catch (e) {
                return { message: String(e) };
            }
        });
    }
    /**
     * @param Movie movie
     * @returns responseMongoMovie |  error
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(Movie) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.insertOne(Movie));
            }
            catch (e) {
                return { message: String(e) };
            }
        });
    }
    /**
     * @param id
     * @param Movie
     */
    update(id, Movie) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //{ _id: userID }, { $set: { name: "Nuevo Nombre" } }
                return yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.updateOne({ _id: id }, { $set: Movie }));
            }
            catch (e) {
                return { message: String(e) };
            }
        });
    }
    delete(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.deleteOne({ _id: new mongodb_1.ObjectId(id) }));
            }
            catch (e) {
                return { message: String(e), id };
            }
        });
    }
    // Función para eliminar duplicados basados en la propiedad "_id"
    eliminarDuplicados(arr, prop) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return arr.filter((obj, index, self) => index === self.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (o) => o[prop] === obj[prop]));
    }
}
exports.default = MovieRepository;
