"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('¡Hola, este es mi servicio Express en TypeScript!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
