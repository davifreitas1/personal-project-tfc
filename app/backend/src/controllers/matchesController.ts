import { Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private service = new MatchesService()) {  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const inProgressBool = inProgress === 'true' ? true: false;
      const { status, data } = await this.service.getAllInProgress(inProgressBool);
      return res.status(status).json(data);
    }

    const { status, data } = await this.service.getAll();
    return res.status(status).json(data);
  };

  create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body as IMatch;
    const { status, data } = await this.service.create(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals
    );

    return res.status(status).json(data);
  };

  finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const { status, data } = await this.service.finish(idNumber);

    return res.status(status).json(data);
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body as IMatch;
    const idNumber = Number(id);
    const { status } = await this.service.updateGoals(idNumber, homeTeamGoals, awayTeamGoals);

    res.status(status).json();
  };
}

export default MatchesController;