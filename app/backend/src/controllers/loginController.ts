import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/loginService';

class LoginController {
  constructor(private service = new LoginService()) { }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as ILogin;
    const { status, data } = await this.service.login(email, password);

    return res.status(status).json(data);
  };

  role = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { status, data } = await this.service.role(token);

    return res.status(status).json(data);
  };
}

export default LoginController;