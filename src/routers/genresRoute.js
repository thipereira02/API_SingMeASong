import express from 'express';

import * as genreController from '../controllers/genreController.js';

const router = express.Router();

router.post('/genre', genreController.createGenre);
router.get('/genre', genreController.listGenres);

export default router;
