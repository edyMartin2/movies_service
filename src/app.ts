// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import MoviesApplication from './application/MovieApplication';
import Movies from './models/MoviesModel';

const app = express();
const PORT = 3000;
const moviesRp = new MoviesApplication

// Middleware
app.use(bodyParser.json());

/** ROUTES */

/**
 * endpoint / for get all movies
 */
app.get('/', async (req, res) => {
  let movies: Movies = await moviesRp.findAll()
  res.json(movies);
});

/**
 * endpoint / for get one movie
 */
app.get('/:id', async (req, res) => {
  let id = req.params.id
  let movies: Movies = await moviesRp.findById(id)
  res.json(movies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Running in port : ${PORT}`);
});
