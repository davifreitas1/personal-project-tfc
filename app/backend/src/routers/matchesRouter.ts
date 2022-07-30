import * as express from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesValidation from '../middlewares/matchesValidation';
import TokenValidation from '../middlewares/tokenValidation';

const matchesRouter = express.Router();
const controller = new MatchesController();
const validation = new MatchesValidation();
const tokenValidation = new TokenValidation();

matchesRouter.get('/', controller.getAll);
matchesRouter.post(
  '/',
  validation.validate,
  tokenValidation.validation,
  controller.create,
);
matchesRouter.patch('/:id/finish', controller.finish);
matchesRouter.patch('/:id', controller.updateGoals);

export default matchesRouter;
