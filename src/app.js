import express from 'express';
import cors from 'cors';

import * as recommendationController from './controllers/recommendationsController.js';
import * as genreController from './controllers/genreController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationController.newRecommendation);
app.post('/recommendations/:id/upvote', recommendationController.upvoteRecommendation);
app.post('/recommendations/:id/downvote', recommendationController.downvoteRecommendation);
app.get('/recommendations/random', recommendationController.getRandomRecommendation);
app.get('/recommendations/top/:amount', recommendationController.topRecommendations);
app.post('/genre', genreController.createGenre);

export default app;
