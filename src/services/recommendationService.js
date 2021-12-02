import * as recommendationRepository from '../repositories/recommendationRepository.js';

import { isYoutubeVideo } from '../utils/isYoutubeLink.js';

export async function checkData(name, youtubeLink) {
  if (!name || !isYoutubeVideo(youtubeLink)) return false;
  return true;
}

export async function checkIfExists(youtubeLink) {
  const result = await recommendationRepository.checkIfExists(youtubeLink);
  if (result) return true;
  return false;
}

export async function insertVideo(name, youtubeLink) {
  await recommendationRepository.insertVideo(name, youtubeLink);
  return true;
}

export async function changingScore(id, review) {
  const recomm = await recommendationRepository.recommById(id);
  if (!recomm) return false;
  let { score } = recomm;

  if (review === '+') {
    score += 1;
    await recommendationRepository.updateScore(id, score);
  } else {
    score -= 1;
    if (score <= -5) await recommendationRepository.deleteVideo(id);
    else await recommendationRepository.updateScore(id, score);
  }
  return true;
}
