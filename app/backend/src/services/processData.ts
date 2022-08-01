import Matches from '../database/models/Matches';

class ProcessData {
  private _id: number;
  private _matches: Matches[];
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;

  constructor(matches: Matches[], id: number) {
    this._id = id;
    this._matches = matches;
    this._totalPoints = 0;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalDraws = 0;
    this._totalLosses = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._efficiency = 0;
  }

  private calculateHome() {
    const inHomeGames = this._matches.filter((match) => match.homeTeam === this._id);
    this._totalGames += inHomeGames.length;

    for (let index = 0; index < inHomeGames.length; index += 1) {
      const { homeTeamGoals, awayTeamGoals } = inHomeGames[index];

      this._goalsFavor += homeTeamGoals;
      this._goalsOwn += awayTeamGoals;
      this.getMatchResult(homeTeamGoals, awayTeamGoals);
    }
  }

  private calculateAway() {
    const inAwayGames = this._matches.filter((match) => match.awayTeam === this._id);
    this._totalGames += inAwayGames.length;

    for (let index = 0; index < inAwayGames.length; index += 1) {
      const { homeTeamGoals, awayTeamGoals } = inAwayGames[index];

      this._goalsFavor += awayTeamGoals;
      this._goalsOwn += homeTeamGoals;
      this.getMatchResult(awayTeamGoals, homeTeamGoals);
    }
  }

  private getMatchResult(goalsFavor: number, goalsOwn: number) {
    if (goalsFavor > goalsOwn) {
      this._totalVictories += 1;
    } else if (goalsFavor < goalsOwn) {
      this._totalLosses += 1;
    } else {
      this._totalDraws += 1;
    }
  }

  private finalCalculation() {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._totalPoints = (this._totalVictories * 3) + this._totalDraws;
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  private goalsData() {
    const goalsFavor = this._goalsFavor;
    const goalsOwn = this._goalsOwn;
    const goalsBalance = this._goalsBalance;
    const efficiency = this._efficiency;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  private pointsData() {
    const totalPoints = this._totalPoints;
    const totalGames = this._totalGames;
    const totalVictories = this._totalVictories;
    const totalDraws = this._totalDraws;
    const totalLosses = this._totalLosses;
    return {
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  homeData() {
    this.calculateHome();
    this.finalCalculation();
    const points = this.pointsData();
    const goals = this.goalsData();
    return { ...goals, ...points };
  }

  awayData() {
    this.calculateAway();
    this.finalCalculation();
    const points = this.pointsData();
    const goals = this.goalsData();
    return { ...goals, ...points };
  }

  totalData() {
    this.calculateHome();
    this.calculateAway();
    this.finalCalculation();
    const points = this.pointsData();
    const goals = this.goalsData();
    return { ...goals, ...points };
  }
}

export default ProcessData;
