import * as express from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = express.Router();
const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.home);
leaderboardRouter.get('/away', controller.away);
leaderboardRouter.get('/', controller.total);

export default leaderboardRouter;
