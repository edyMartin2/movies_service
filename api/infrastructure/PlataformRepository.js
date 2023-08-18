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
class PlataformRepository {
    constructor() {
        this.db = undefined;
        // setTimeout(() => {
        this.inicializar();
        //}, 2000);
    }
    inicializar() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield Repository_1.default.getInstance();
            this.collection = yield ((_a = this.db) === null || _a === void 0 ? void 0 : _a.getCollection('Plataforms'));
        });
    }
    /**
     *
     * @param id string UUID
     * @returns if id is´nt empty return one plataform else return all plataforms[]  or return error
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(id = "") {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = id !== "" ? { _id: new mongodb_1.ObjectId(id) } : {};
                const find = yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.find(ids).toArray());
                console.log("entramos en try", ids, find);
                return find;
            }
            catch (e) {
                console.log("entramos en catch", e);
                return { message: String(e) };
            }
        });
    }
    /**
     * @param Plataform plataform
     * @returns responseMongoPlataform | error
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(Plataform) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insert = yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.insertOne(Plataform));
                console.log("entramos en try", Plataform, insert);
                return insert;
            }
            catch (e) {
                console.log("entramos en catch", e);
                return { message: String(e) };
            }
        });
    }
    /**
     * @param id
     * @param Plataform
     */
    update(id, Plataform) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.updateOne(id, Plataform));
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
                return yield ((_a = this.collection) === null || _a === void 0 ? void 0 : _a.deleteOne(id));
            }
            catch (e) {
                return { message: String(e) };
            }
        });
    }
}
exports.default = PlataformRepository;
