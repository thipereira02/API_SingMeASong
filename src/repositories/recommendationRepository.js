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
