import { ObjectId } from 'mongodb';

interface responseMongoMovie {
    acknowledged: boolean,
    insertedId: ObjectId
}


export {
    responseMongoMovie
}