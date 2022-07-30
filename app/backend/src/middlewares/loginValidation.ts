import { NextFunction, Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';

class LoginValidation {
  private fieldsValidation = (email: string, password: string) => {
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

    if (!regex.test(email)) {
      return [false, 'email with incorrect format'];
    }

    if (password.length < 6) {
      return [false, 'password length must be at least 6 characters long'];
    }

    return [true, null];
  };

  public validation = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    const [valid, message] = this.fieldsValidation(email, password);

    if (!valid) {
      return res.status(400).json({
        message,
      });
    }

    next();
  };
}

export default LoginValidation;