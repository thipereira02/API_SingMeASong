import * as genreRepository from '../repositories/genreRepository.js';

export async function checkIfGenreExists(name) {
  const check = await genreRepository.checkIfGenreExists(name);
  if (check) return true;
  return false;
}

export async function createNewGenre(name) {
  await genreRepository.createNewGenre(name);
  return true;
}
