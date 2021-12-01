import express from 'express';
import cors from 'cors';

import * as recommendationController from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationController.newRecommendation);

export default app;
