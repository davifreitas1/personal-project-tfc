import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

class GenerateToken {
  generate(payload: object) {
    const token = jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  decode(token: string) {
    const result = jwt.verify(token, JWT_SECRET);
    const decoded = result as jwt.JwtPayload;
    return decoded;
  }
}

export default GenerateToken;