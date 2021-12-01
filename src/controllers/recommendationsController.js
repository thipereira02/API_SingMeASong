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
