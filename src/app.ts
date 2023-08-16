// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';


import MoviesApplication from './application/MovieApplication';
import Movies from './models/MoviesModel';
import { ObjectId } from 'mongodb';

const app = express();
const PORT = 3000;
const moviesRp = new MoviesApplication()



// Middleware
app.use(bodyParser.json());

/** ROUTES */

/**
 * endpoint / for get all movies
 */
app.get('/', async (_, res) => {
  let movies: Movies = await moviesRp.findAll()
  res.json(movies);
});

/**
 * endpoint / for get one movie
 */
app.get('/:id', async (req, res) => {
  let id = req.params.id
  let movie: Movies = await moviesRp.findById(id)
  res.json(movie);
});

/**
 * endpoint / for create one movie
 */
app.post('/', async (req, res) => {
  let body: Movies = req.body
  let save_movie = await moviesRp.create(body)
  res.json(save_movie)
})

/**
 * endpoint / for update one movie
 */
app.post('/:id', async (req, res) => {
  let id: ObjectId = new ObjectId(req.params.id)
  let body: Movies = req.body
  let update_movie = await moviesRp.update(id, body)
  res.json(update_movie)
})

app.delete('/:id', async (req, res) => {
  let id: ObjectId = new ObjectId(req.params.id)
  let delete_movie = await moviesRp.delete(id)
  res.json(delete_movie)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Running in port : ${PORT}`);
});
