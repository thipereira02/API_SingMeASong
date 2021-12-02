import '../setup.js';
import connection from '../database.js';

export async function checkIfExists(youtubeLink) {
  const result = await connection.query(`
    SELECT *
    FROM recommendations
    WHERE "youtubeLink"=$1
  `, [youtubeLink]);
  if (result.rowCount !== 0) return true;
  return false;
}

export async function insertVideo(name, youtubeLink, genresIds) {
  const id = await connection.query(`
    INSERT INTO recommendations
    (name, "youtubeLink")
    VALUES ($1, $2)
    RETURNING id
  `, [name, youtubeLink]);

  for (let i = 0; i < genresIds.length; i += 1) {
    connection.query(`
      INSERT INTO recommendations_genres
      ("recommendationId", "genreId")
      VALUES ($1, $2)
    `, [id.rows[0].id, genresIds[i]]);
  }
}

export async function recommById(id) {
  const result = await connection.query(`
    SELECT *
    FROM recommendations
    WHERE id=$1
  `, [id]);
  if (result.rowCount === 0) return false;
  return result.rows[0];
}

export async function updateScore(id, score) {
  await connection.query(`
    UPDATE recommendations
    SET score=$1
    WHERE id=$2
  `, [score, id]);
}

export async function deleteVideo(id) {
  await connection.query(`
    DELETE
    FROM recommendations
    WHERE id=$1
  `, [id]);
}

export async function checkForSongs() {
  const result = connection.query(`
    SELECT *
    FROM recommendations
  `);
  if (result.rowCount === 0) return false;
  return true;
}

export async function findVideos(where) {
  const result = await connection.query(`
    SELECT *
    FROM recommendations
    ${where}
    ORDER BY RANDOM()
  `);
  return result.rows[0];
}

export async function topRecommendations(amount) {
  const result = await connection.query(`
    SELECT *
    FROM recommendations
    ORDER BY score DESC
    LIMIT $1
  `, [amount]);
  if (result.rowCount !== 0) return result.rows;
  return false;
}
