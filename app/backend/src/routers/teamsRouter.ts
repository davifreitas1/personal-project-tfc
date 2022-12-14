import * as express from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = express.Router();
const controller = new TeamsController();

teamsRouter.get('/', controller.getAll);
teamsRouter.get('/:id', controller.getOne);

export default teamsRouter;
