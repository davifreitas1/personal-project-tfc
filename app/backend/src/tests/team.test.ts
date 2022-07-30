import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    id: 1,
    teamName: 'Sport',
  },
  {
    id: 2,
    teamName: 'Santa Cruz',
  },
];

const teamMock = {
  id: 1,
  teamName: 'Sport',
};

describe('Testa rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
  });
  
  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os times corretamente', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    expect(chaiHttpResponse.body[1]).to.have.property('id');
    expect(chaiHttpResponse.body[1]).to.have.property('teamName');
  });
});

describe('Testa rota /teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findOne")
      .resolves(teamMock as Teams);
  });
  
  after(()=>{
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('Retorna um time corretamente', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});