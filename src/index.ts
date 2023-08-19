// src/app.ts
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import MoviesApplication from './application/MovieApplication'
import PlataformApplication from './application/PlataformApplication'
import Movies from './models/MoviesModel'
import { ObjectId } from 'mongodb'
import Plataforms from './models/PlataformModel'
import cors from 'cors'
const app = express()

const moviesRp = new MoviesApplication()
const plataformRP = new PlataformApplication()


// Middleware
app.use(bodyParser.json());
app.use(cors())

//  ******************* Movies ************************

/**
 * endpoint / for get all movies
 */
app.get('/api/movies', async (_, res) => {
  const movies: Movies = await moviesRp.findAll()
  res.json(movies)
});

/**
 * endpoint /movies/:id for get one movie
 */
app.get('/api/movies/:id', async (req, res) => {
  const id = req.params.id
  const movie: Movies = await moviesRp.findById(id)
  res.json(movie)
});

/**
 * endpoint /movies for create one movie
 */
app.post('/api/movies', async (req, res) => {
  const body: Movies = req.body
  const save_movie = await moviesRp.create(body)
  res.json(save_movie)
})

/**
 * endpoint /movies/:id for update one movie
 */
app.post('/api/movies/:id', async (req, res) => {
  const id: ObjectId = new ObjectId(req.params.id)
  const body: Movies = req.body
  const update_movie = await moviesRp.update(id, body)
  res.json(update_movie)
})

/**
 * endpoint /movies/:id for delete one movie
 */
app.delete('/api/movies/:id', async (req, res) => {
  const id: ObjectId = new ObjectId(req.params.id)
  console.log(id)
  const delete_movie = await moviesRp.delete(id)
  res.json(delete_movie)
})

//  ******************* Plataforms ************************

/**
 * endpoint /platforms for get all plataforms
 */
app.get('/api/plataforms', async (req, res) => {
  const plataform: Plataforms = await plataformRP.findAll()
  console.log('respuesta de pla', plataform)
  res.json(plataform)
})

/**
 * endpoint /plataforms/:id for get one plataform
 */
app.get('/api/plataforms/:id', async (req, res) => {
  const id = req.params.id
  const plataform: Plataforms = await plataformRP.findById(id)
  res.json(plataform)
});

/**
 * endpoint /movies for create one movie
 */
app.post('/api/plataforms', async (req, res) => {
  const body: Plataforms = req.body
  const save_movie = await plataformRP.create(body)
  res.json(save_movie)
})

app.get('/api', async (req, res) => {

  res.json({ 'message': "hola mundos" })
})


//versel platform 
http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port ' + app.get('port'))
})