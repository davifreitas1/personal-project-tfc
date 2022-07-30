import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import GenerateToken from '../util/generateToken';

chai.use(chaiHttp);

const { expect } = chai;

const loginMock = {
  id: 1,
  username: 'user',
  role: 'role',
  email: "email@mail.com",
  password: "$2a$10$zqptZCXyJgzWlzpoD0BuEeGeapRGen1BxR4uH7e9ix67oR3K6z6K.",
};

const TOKEN_NOT_FOUND = 'Token not found';
const UNAUTHORIZED = 'Invalid token';
const CANT_EMPTY_FIELDS = 'All fields must be filled';
const EMAIL_NOT_CORRECT = 'email with incorrect format';
const PASSWORD_NOT_CORRECT = 'password length must be at least 6 characters long';
const INVALID_FIELDS = 'Incorrect email or password';

describe('Testa rota /login', () => {
  let chaiHttpResponse: Response;

  describe('Quando são passadas informações não validadas', () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(loginMock as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Quando não é passado um email', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: '123456',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal(CANT_EMPTY_FIELDS);
    });
    
    it('Quando não é passado uma password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "email@mail.com",
      });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal(CANT_EMPTY_FIELDS);
    });
  
    it('Quando é passado um email no formato errado', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "123456",
        password: '123456',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal(EMAIL_NOT_CORRECT);
    });
  
    it('Quando é passado uma password no formato errado', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "email@mail.com",
        password: '123',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal(PASSWORD_NOT_CORRECT);
    });
  });

  describe('Quando é passado um email errado', () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves();
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna a mensagem correta', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "wrong@mail.com",
        password: '123456',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_FIELDS);
    });
  });

  describe('Quando é passado uma senha errada', () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(loginMock as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna a mensagem correta', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "email@mail.com",
        password: '123457',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_FIELDS);
    });
  });

  describe('Quando são passadas informações corretas', () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(loginMock as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna um token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "email@mail.com",
        password: '123456',
      });
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });
});

describe('Testa rota /login/validate', () => {
  describe('Quando é enviado um token válido', () => {
    let chaiHttpResponse;
    const generator = new GenerateToken();
    const token = generator.generate({ id: 1 });

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(loginMock as Users);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna a role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', token);

      expect(chaiHttpResponse.body).to.have.property('role');
    });
  });
});
