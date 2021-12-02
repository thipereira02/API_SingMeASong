import '../setup.js';
import connection from '../database.js';

export async function checkIfExists(youtubeLink) {
  const result = await connection.query(`
    SELECT *
    FROM videos
    WHERE "youtubeLink"=$1
  `, [youtubeLink]);
  if (result.rowCount !== 0) return true;
  return false;
}

export async function insertVideo(name, youtubeLink) {
  await connection.query(`
    INSERT INTO videos
    (name, "youtubeLink")
    VALUES ($1, $2)
  `, [name, youtubeLink]);
}

export async function recommById(id) {
  const result = await connection.query(`
    SELECT *
    FROM videos
    WHERE id=$1
  `, [id]);
  if (result.rowCount === 0) return false;
  return result.rows[0];
}

export async function updateScore(id, score) {
  await connection.query(`
    UPDATE videos
    SET score=$1
    WHERE id=$2
  `, [score, id]);
}

export async function deleteVideo(id) {
  await connection.query(`
    DELETE
    FROM videos
    WHERE id=$1
  `, [id]);
}
