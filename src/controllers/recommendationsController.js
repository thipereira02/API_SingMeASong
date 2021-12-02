/* eslint-disable consistent-return */
import * as recommendationService from '../services/recommendationService.js';

export async function newRecommendation(req, res) {
  try {
    const { name, youtubeLink, genresIds } = req.body;

    const checkIfDataIsValid = await recommendationService.checkData(name, youtubeLink, genresIds);
    if (!checkIfDataIsValid) return res.sendStatus(400);

    const videoAlreadyExists = await recommendationService.checkIfExists(youtubeLink);
    if (videoAlreadyExists) return res.sendStatus(409);

    await recommendationService.insertVideo(name, youtubeLink, genresIds);

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
    const recommendation = await recommendationService.getRecommendation();
    if (!recommendation) return res.sendStatus(404);

    return res.send(recommendation);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function topRecommendations(req, res) {
  try {
    const { amount } = req.params;

    const topVideos = await recommendationService.topVideos(amount);
    if (topVideos === null) return res.sendStatus(406);
    if (topVideos === false) return res.sendStatus(404);

    return res.send(topVideos);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
