import { Collection } from 'mongodb';
import Movies from "../models/MoviesModel";
import Repository from "./Repository";
import { ObjectId } from 'mongodb';
import PlataformRepository from './PlataformRepository';
import Plataforms from '../models/PlataformModel';

const plataformRepository = new PlataformRepository()
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(id: string = ""): Promise<any> {
        try {
            const ids = id !== "" ? { _id: new ObjectId(id) } : {}
            const movies = await this.collection?.find(ids).toArray();
            const movies_platform = movies?.map(async (i) => {
                const platform = i.platforms
                const platformInfo = await Promise.all(await platform.map(async (p: Plataforms) => {
                    const platformInfo = await plataformRepository.get(String(p._id)).then(res => { return res })
                    const data = {
                        ...i,
                        platforms: platformInfo
                    }
                    return data
                }))
                return platformInfo
            })

            const movies_to_platform = movies_platform !== undefined ? await Promise.all(movies_platform) : []
            const filtro = movies_to_platform.filter(e => e !== undefined)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const filtro_unidim: any = filtro.flat()

            // Elimina duplicados basados en la propiedad "_id"
            const arregloSinDuplicados = _.uniqBy(filtro_unidim, '_id');

            return arregloSinDuplicados
        } catch (e) {
            return { message: String(e) }
        }

    }


    /**
     * @param Movie movie
     * @returns responseMongoMovie |  error
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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