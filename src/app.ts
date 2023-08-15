// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import Repository from './infrastructure/Repository';


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', async (req, res) => {
  let x = await Repository.getInstance();
  console.log(x)
  res.send('¡Hola, esdte es mi servicio Express en TypeScript!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
