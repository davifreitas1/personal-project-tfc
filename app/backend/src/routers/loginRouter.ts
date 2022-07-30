import * as express from 'express';
import LoginValidation from '../middlewares/loginValidation';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();
const controller = new LoginController();
const loginValidation = new LoginValidation();

loginRouter.post('/', loginValidation.validation, controller.login);
loginRouter.get('/validate', controller.role);

export default loginRouter;
