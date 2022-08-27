import express from 'express';
import PagesHandler from '../../handlers/PagesHandler';

const router = express.Router();

router.get('/', PagesHandler.main);

export default router;