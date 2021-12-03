import express from 'express';

import * as recommendationController from '../controllers/recommendationsController.js';

const router = express.Router();

router.post('/recommendations', recommendationController.newRecommendation);
router.post('/recommendations/:id/upvote', recommendationController.upvoteRecommendation);
router.post('/recommendations/:id/downvote', recommendationController.downvoteRecommendation);
router.get('/recommendations/random', recommendationController.getRandomRecommendation);
router.get('/recommendations/top/:amount', recommendationController.topRecommendations);

export default router;
