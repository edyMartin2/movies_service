import { ObjectId } from 'mongodb';
import Plataforms from './PlataformModel';


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
    id: ObjectId, // ID de la película.
    title: string, // Nombre de la película. Ejemplo: Spiderman 2: El Retorno
    slug: string, // URL de la película basado en el título. Este campo se debe generar en el backend. Ejemplo: spiderman-2-el-retorno
    image: string, // Logo o imagen principal de la película. Ejemplo: spiderman-2.jpg
    director: string, // Nombre del director.
    platforms?: Plataforms[], // Array con las plataformas en las que se encuentra la película.
    score: number, // Promedio de las reseñas. Puntuación media calculada en base a las calificaciones de cada una de las reseñas de la película.
    reviews?: Review[] // Array que contiene todas las reseñas de la película separadas por plataforma..
    createdAt?: Date, // Fecha de creación de la película.
    updatedAt?: Date, // Fecha de última actualización de la película.
}

