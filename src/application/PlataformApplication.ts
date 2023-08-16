import { ObjectId } from "mongodb";
import PlataformRepository from "../infrastructure/PlataformRepository";
const PlataformRp = new PlataformRepository()
import Plataforms from "../models/PlataformModel";

class PlataformApplication {

    /**
     * get all plataforms with this
     * @returns Plataforms[]
     */
    async findAll(): Promise<Plataforms> {
        const plataform: Plataforms = await PlataformRp.get()
        console.log('findall', plataform)
        return plataform
    }

    /**
     * get one movie with this
     * @param id UUID 
     * @returns Plataforms
     */
    async findById(id: string) {
        const plataform = await PlataformRp.get(id)
        return plataform
    }

    /**
     * create one plataform with this
     * @param Plataform 
     * @returns 
     */
    async create(Plataform: Plataforms) {
        const save_plataform = await PlataformRp.post(Plataform)
        return save_plataform
    }

    /**
     * 
     * @param id 
     * @param Plataform 
     * @returns 
     */
    async update(id: ObjectId, Plataform: Plataforms) {
        const update_plataform = await PlataformRp.update(id, Plataform)
        return update_plataform
    }

    /**
     * 
     * @param id 
     * @returns result of delete
     */
    async delete(id: ObjectId){
        const delete_plataform = await PlataformRp.delete(id)
        return delete_plataform
    }
}

export default PlataformApplication