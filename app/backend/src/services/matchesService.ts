import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchesService {
  constructor(private model = Matches) { }

  async getAll() {
    const matches = await this.model.findAll(
      {
        include: [
          {
            model: Teams, as: 'teamHome', attributes: { exclude: ['id'] },
          },
          {
            model: Teams, as: 'teamAway', attributes: { exclude: ['id'] },
          },
        ],
      },
    );

    return {
      status: 200,
      data: matches,
    };
  }

  async getAllInProgress(inProgress: boolean) {
    const matches = await this.model.findAll(
      {
        include: [
          {
            model: Teams, as: 'teamHome', attributes: { exclude: ['id'] },
          },
          {
            model: Teams, as: 'teamAway', attributes: { exclude: ['id'] },
          },
        ],
        where: { inProgress },
      },
    );

    return {
      status: 200,
      data: matches,
    };
  }

  async create(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await this.model.create(
      {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      },
    );

    return {
      status: 201,
      data: match,
    };
  }

  async finish(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });

    return {
      status: 200,
      data: {
        message: 'Finished',
      },
    };
  }

  async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return {
      status: 200,
    };
  }
}

export default MatchesService;
