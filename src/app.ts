// src/app.ts
import express from 'express'
import bodyParser from 'body-parser'

import MoviesApplication from './application/MovieApplication'
import PlataformApplication from './application/PlataformApplication'
import Movies from './models/MoviesModel'
import { ObjectId } from 'mongodb'
import Plataforms from './models/PlataformModel'

const app = express()
const PORT = 3000
const moviesRp = new MoviesApplication()
const plataformRP = new PlataformApplication()



// Middleware
app.use(bodyParser.json());

//  ******************* Movies ************************

/**
 * endpoint / for get all movies
 */
app.get('/movies', async (_, res) => {
  let movies: Movies = await moviesRp.findAll()
  res.json(movies)
});

/**
 * endpoint /movies/:id for get one movie
 */
app.get('/movies/:id', async (req, res) => {
  let id = req.params.id
  let movie: Movies = await moviesRp.findById(id)
  res.json(movie)
});

/**
 * endpoint /movies for create one movie
 */
app.post('/movies', async (req, res) => {
  let body: Movies = req.body
  let save_movie = await moviesRp.create(body)
  res.json(save_movie)
})

/**
 * endpoint /movies/:id for update one movie
 */
app.post('/movies/:id', async (req, res) => {
  let id: ObjectId = new ObjectId(req.params.id)
  let body: Movies = req.body
  let update_movie = await moviesRp.update(id, body)
  res.json(update_movie)
})

/**
 * endpoint /movies/:id for delete one movie
 */
app.delete('/movies/:id', async (req, res) => {
  let id: ObjectId = new ObjectId(req.params.id)
  console.log(id)
  let delete_movie = await moviesRp.delete(id)
  res.json(delete_movie)
})

//  ******************* Plataforms ************************

/**
 * endpoint /platforms for get all plataforms
 */
app.get('/plataforms', async (req, res) => {
  let plataform: Plataforms = await plataformRP.findAll()
  console.log('respuesta de pla', plataform)
  res.json(plataform)
})

/**
 * endpoint /plataforms/:id for get one plataform
 */
app.get('/plataforms/:id', async (req, res) => {
  let id = req.params.id
  let plataform: Plataforms = await plataformRP.findById(id)
  res.json(plataform)
});

/**
 * endpoint /movies for create one movie
 */
app.post('/plataforms', async (req, res) => {
  let body: Plataforms = req.body
  let save_movie = await plataformRP.create(body)
  res.json(save_movie)
})
// Start the server
app.listen(PORT, () => {
  console.log(`Running in port : ${PORT}`)
});
