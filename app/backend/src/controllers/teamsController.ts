import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  constructor(private service = new TeamsService()) { }

  getAll = async (_req: Request, res: Response) => {
    const { status, data } = await this.service.getAll();

    return res.status(status).json(data);
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = Number(id);
    const { status, data } = await this.service.getOne(idNumber);

    return res.status(status).json(data);
  };
}

export default TeamsController;