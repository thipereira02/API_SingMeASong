/* eslint-disable import/prefer-default-export */

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
