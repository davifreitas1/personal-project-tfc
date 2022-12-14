import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import Teams from '../database/models/Teams';

class MatchesValidation {
  private validateTeamsId = async (homeTeam: number, awayTeam: number) => {
    const teamHome = await Teams.findOne({ where: { id: homeTeam } });
    const teamAway = await Teams.findOne({ where: { id: awayTeam } });

    if (!teamHome || !teamAway) {
      return false;
    }

    return true;
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body as IMatch;

    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const validateTeam = await this.validateTeamsId(homeTeam, awayTeam);

    if (!validateTeam) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    next();
  };
}

export default MatchesValidation;
