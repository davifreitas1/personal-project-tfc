import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import GenerateToken from '../util/generateToken';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Sport',
    },
    teamAway: {
      teamName: 'Santa Cruz',
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Santa Cruz',
    },
    teamAway: {
      teamName: 'Sport',
    }
  }
];

const matchesMockInProgressTrue = [
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Santa Cruz',
    },
    teamAway: {
      teamName: 'Sport',
    }
  }
];

const createdMatch = {
  "id": 1,
  "homeTeam": 1,
  "homeTeamGoals": 2,
  "awayTeam": 2,
  "awayTeamGoals": 2,
  "inProgress": true,
};

const EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';

describe('Testa a rota /matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMock as unknown as Matches[]);
  });
  
  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os matches corretamente', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Testa a rota /matches?inProgress=', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchesMockInProgressTrue as unknown as Matches[]);
  });
  
  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Retorna matches em progresso', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0].inProgress).to.be.equal(true);
  });
});

describe('Testa a rota /matches com método post', () => {
  let chaiHttpResponse: Response;
  const generator = new GenerateToken();
  const token = generator.generate({ id: 1 });

  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves(createdMatch as Matches);
    sinon
      .stub(Users, "findOne")
      .resolves({ id: 1 } as Users);
  });
  
  after(()=>{
    (Matches.create as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Retorna a partida criada', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', token)
    .send(
      {
      "homeTeam": 1,
      "awayTeam": 2, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
      }
    );

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.an('object');
  });
});

describe('Testa a rota /matches com método post', () => {
  let chaiHttpResponse: Response;
  const generator = new GenerateToken();
  const token = generator.generate({ id: 1 });

  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves(createdMatch as Matches);
    sinon
      .stub(Users, "findOne")
      .resolves({ id: 1 } as Users);
  });
  
  after(()=>{
    (Matches.create as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Retorna mensagem correta ao receber dois ids iguais', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', token)
    .send(
      {
      "homeTeam": 2,
      "awayTeam": 2, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
      }
    );

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal(EQUAL_TEAMS);
  });
});

describe('Testa a rota /matches/:id/finish', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves();
  });
  
  after(()=>{
    (Matches.create as sinon.SinonStub).restore();
  });

  it('Retorna a messagem correta', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  });
});

describe('Testa a rota /matches/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "update")
      .resolves();
  });
  
  after(()=>{
    (Matches.update as sinon.SinonStub).restore();
  });

  it('Retorna o status correto ao atualizar um match', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1').send(
      {
        homeTeamGoals: 10,
        awayTeamGoals: 10,
      }
    );

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});