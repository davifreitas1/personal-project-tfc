import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

class GenerateToken {
  constructor(private token = jwt) { }

  generate(payload: object) {
    const token = this.token.sign({ data: payload }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  decode(token: string) {
    const result = this.token.verify(token, JWT_SECRET);
    const decoded = result as jwt.JwtPayload;
    return decoded;
  }
}

export default GenerateToken;
