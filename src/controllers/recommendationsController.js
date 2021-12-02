/* eslint-disable consistent-return */
import * as recommendationService from '../services/recommendationService.js';

export async function newRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    const checkIfDataIsValid = await recommendationService.checkData(name, youtubeLink);
    if (!checkIfDataIsValid) return res.sendStatus(400);

    const videoAlreadyExists = await recommendationService.checkIfExists(youtubeLink);
    if (videoAlreadyExists) return res.sendStatus(409);

    await recommendationService.insertVideo(name, youtubeLink);

    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function upvoteRecommendation(req, res) {
  try {
    const { id } = req.params;

    const changeScore = await recommendationService.changingScore(id, '+');
    if (!changeScore) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function downvoteRecommendation(req, res) {
  try {
    const { id } = req.params;

    const changeScore = await recommendationService.changingScore(id, '-');
    if (!changeScore) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getRandomRecommendation(req, res) {
  try {
    const result = await recommendationService.getRecommendation();
    if (!result) return res.sendStatus(404);

    return res.send(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
