import '../setup.js';
import connection from '../database.js';

export async function checkIfGenreExists(name) {
  const result = await connection.query(`
    SELECT *
    FROM genres
    WHERE name=$1    
  `, [name]);
  if (result.rowCount !== 0) return true;
  return false;
}

export async function createNewGenre(name) {
  await connection.query(`
    INSERT INTO genres
    (name)
    VALUES ($1)
  `, [name]);
}
