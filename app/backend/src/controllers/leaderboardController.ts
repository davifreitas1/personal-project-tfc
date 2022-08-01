import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  constructor(private _service = new LeaderboardService()) { }

  home = async (_req: Request, res: Response) => {
    const teamsBoard = await this._service.home();

    return res.status(200).json(teamsBoard);
  };

  away = async (_req: Request, res: Response) => {
    const teamsBoard = await this._service.away();

    return res.status(200).json(teamsBoard);
  };

  total = async (_req: Request, res: Response) => {
    const teamsBoard = await this._service.total();

    return res.status(200).json(teamsBoard);
  };
}

export default LeaderboardController;
