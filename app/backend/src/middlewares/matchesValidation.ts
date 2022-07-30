import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
import Teams from '../database/models/Teams';

class MatchesValidation {
  private validateTeamsId = async (homeTeam: number, awayTeam: number) => {
    const teamHome = await Teams.findOne({ where: { id: homeTeam } });
    const teamAway = await Teams.findOne({ where: { id: awayTeam } });

    console.log(teamHome, teamAway);

    if (!teamHome || !teamAway) {
      return false;
    }

    return true;
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body as IMatch;

    console.log(homeTeam, awayTeam);

    if (homeTeam === awayTeam) {
      console.log('rodei');
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const validateTeam = await this.validateTeamsId(homeTeam, awayTeam);

    if (!validateTeam) {
      return res.status(400).json({
        message: 'There is no team with such id!',
      });
    }

    next();
  };
}

export default MatchesValidation;