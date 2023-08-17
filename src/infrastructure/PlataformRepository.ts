import { Collection } from 'mongodb';
import Repository from "./Repository";
import { ObjectId } from 'mongodb';
import Plataforms from '../models/PlataformModel';


class PlataformRepository {
    private db: Repository | undefined;
    private collection: Collection | undefined

    constructor() {
        this.db = undefined
        // setTimeout(() => {
        this.inicializar()
        //}, 2000);
    }

    async inicializar() {
        this.db = await Repository.getInstance()
        this.collection = await this.db?.getCollection('Plataforms')
        //console.log("soy repository ::", this.db)
    }

    /**
     * 
     * @param id string UUID
     * @returns if id is´nt empty return one plataform else return all plataforms[]  or return error 
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async get(id: string = ""): Promise<any> {
        try {
            const ids = id !== "" ? { _id: new ObjectId(id) } : {}
            const find = await this.collection?.find(ids).toArray();
            console.log("entramos en try", ids, find)
            return find
        } catch (e) {
            console.log("entramos en catch", e)
            return { message: String(e) }
        }

    }


    /**
     * @param Plataform plataform
     * @returns responseMongoPlataform | error
     */
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post(Plataform: Plataforms): Promise<any> {
        try {
            const insert = await this.collection?.insertOne(Plataform)
            console.log("entramos en try", Plataform, insert)
            return insert
        } catch (e) {
            console.log("entramos en catch", e)
            return { message: String(e) }
        }
    }

    /**
     * @param id 
     * @param Plataform 
     */
    async update(id: ObjectId, Plataform: Plataforms) {
        try {
            return await this.collection?.updateOne(id, Plataform)
        } catch (e) {
            return { message: String(e) }
        }
    }


    async delete(id: ObjectId) {
        try {
            return await this.collection?.deleteOne(id)
        } catch (e) {
            return { message: String(e) }
        }
    }
}

export default PlataformRepository