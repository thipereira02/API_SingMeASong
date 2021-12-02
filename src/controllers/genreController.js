/* eslint-disable consistent-return */
import * as genreService from '../services/genreService.js';

export async function createGenre(req, res) {
  try {
    const { name } = req.body;

    if (!name) return res.sendStatus(400);

    const checkIfGenreExists = await genreService.checkIfGenreExists(name);
    if (checkIfGenreExists) return res.sendStatus(409);

    await genreService.createNewGenre(name);

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function listGenres(req, res) {
  try {
    const genres = await genreService.listAllGenres();
    if (!genres) return res.sendStatus(404);

    return res.send(genres);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
