import Teams from "../database/models/Teams";
import Matches from "../database/models/Matches";

class MatchesService {
  async getAll() {
    const matches = await Matches.findAll(
      {
        include: [
          {
            model: Teams,
            as: 'teamHome',
            attributes: {
              exclude: ['id'],
            },
          },
          {
            model: Teams,
            as: 'teamAway',
            attributes: {
              exclude: ['id'],
            },
          },
        ],
      }
    );

    return {
      status: 200,
      data: matches,
    };
  }

  async getAllInProgress(inProgress: boolean) {
    const matches = await Matches.findAll(
      {
        include: [
          {
            model: Teams,
            as: 'teamHome',
            attributes: {
              exclude: ['id'],
            },
          },
          {
            model: Teams,
            as: 'teamAway',
            attributes: {
              exclude: ['id'],
            },
          },
        ],
        where: {
          inProgress,
        }
      }
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
    const match = await Matches.create(
      {
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      }
    );

    return {
      status: 201,
      data: match,
    };
  }

  async finish(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });

    return {
      status: 200,
      data: {
        message: 'Finished',
      }
    };
  }

  async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return {
      status: 200,
    };
  }
}

export default MatchesService;