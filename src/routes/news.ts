import * as express from 'express';
import { Router } from 'express';
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNewsById,
  deleteNewsById
} from '../controllers/news';

const router: Router = express.Router();

router.get('/', getAllNews);
router.post('/', createNews);

router.get('/:id', getNewsById);
router.put('/:id', updateNewsById);
router.delete('/:id', deleteNewsById);

export default router;
