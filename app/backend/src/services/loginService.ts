import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/Users';
import GenerateToken from '../util/generateToken';

class LoginService {
  constructor(private generateToken = new GenerateToken()) { }

  async login(email: string, password:string) {
    const user = await Users.findOne({ where: { email } });

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return {
        status: 401,
        data: {
          message: 'Incorrect email or password',
        },
      };
    }

    const { id } = user;
    const token = this.generateToken.generate({ id });
    return {
      status: 200,
      data: {
        token,
      },
    };
  }

  async role(token: string | undefined) {
    if (!token) {
      return { status: 400, data: { message: 'Token not found' } };
    }

    try {
      const decoded = this.generateToken.decode(token);
      const user = await Users.findOne({ where: { id: decoded.data.id } });

      const { role } = user as Users;
      return { status: 200, data: { role } };
    } catch (error) {
      return { status: 401, data: { message: 'Invalid token' } };
    }
  }
}

export default LoginService;
