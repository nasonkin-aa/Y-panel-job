import bodyParser from 'body-parser';
import express from 'express';
import api from './api';
const router = express.Router();
const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use('/api', jsonParser, api);
export default router;
