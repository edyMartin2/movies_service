"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const USERDB = process.env.USERDB;
const PASSWORLD = process.env.PASSWORLD;
const DBNAME = process.env.DBNAME;
const AGENT = process.env.AGENT;
const HOST = process.env.HOST;
//
const URI = `${AGENT}://${USERDB}:${PASSWORLD}@${HOST}`;
/**
 * SINGLETON CLASS
 */
class Repository {
    constructor() {
        this.db = undefined;
        this.client = new mongodb_1.MongoClient(URI);
        console.log('---->', URI, "mongodb://root:1234@localhost:27017");
    }
    /**
     *
     * @returns an instance of this class if exist else create a new instance
     */
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                this.instance = new Repository();
                this.instance.connect();
                return this.instance;
            }
            else if (this.instance.db !== undefined) {
                return this.instance;
            }
            else {
                this.instance.connect();
                return this.instance;
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entramos al connect ', this.db === undefined ? 'vacia' : this.db);
            try {
                yield this.client.connect();
                this.db = this.client.db(DBNAME);
                console.log('Conexión a MongoDB establecida');
            }
            catch (error) {
                console.error('Error al conectar a MongoDB:', error);
                this.db = undefined;
            }
        });
    }
    /**
     *
     * @param collection name of collection
     * @returns a mongo collection
     */
    getCollection(collection) {
        var _a;
        const collectionGet = (_a = this.db) === null || _a === void 0 ? void 0 : _a.collection(collection);
        console.log('coleccionget::', collection);
        return collectionGet;
    }
    static getDb() {
        return this.instance.db;
    }
}
exports.default = Repository;
