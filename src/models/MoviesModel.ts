import { ObjectId } from 'mongodb';

interface Plataforms {
    id: ObjectId, // ID de la plataforma.
    icon: string, // Icono de la plataforma. Ejemplo: netflix-icon.jpg
    title: string, // Nombre de la plataforma. Ejemplo: Netflix
    createdAt: Date, // Fecha de creación de la plataforma.
    updatedAt: Date,
}


interface Review {
    id: ObjectId, // ID de la reseña.
    movie: ObjectId, // ID de la película sobre la que se va a reseñar.
    platform: ObjectId, // ID de la plataforma sobre la que se va a reseñar.
    author: string, // Nombre del autor o usuario que está creando la reseña.
    body: string, // Texto de la reseña.
    score: number, // Calificación 0 a 5 de la reseña.
    createdAt: Date, // Fecha de creación de la reseña.
    updatedAt: Date, // Fecha de actualización de la reseña.
}
export default interface Movies {
    _id: ObjectId;
    title: string
    comments: string
    slug: string
    image: string
    director: string
    platforms: Plataforms[]
    score: number
    createdAt: Date
    updatedAt: Date
    reviews?: Review[]
}