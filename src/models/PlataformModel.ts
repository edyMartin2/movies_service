import { ObjectId } from "mongodb";
export default interface Plataforms {
    _id: ObjectId, // ID de la plataforma.
    icon: string, // Icono de la plataforma. Ejemplo: netflix-icon.jpg
    title: string, // Nombre de la plataforma. Ejemplo: Netflix
    createdAt: Date, // Fecha de creación de la plataforma.
    updatedAt: Date,
}