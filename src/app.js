import express from 'express';
import cors from 'cors';

import recommendationsRoute from './routers/recommendationsRoute.js';
import genresRoute from './routers/genresRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(recommendationsRoute);
app.use(genresRoute);

export default app;
