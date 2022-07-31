import Matches from '../database/models/Matches';

class ProcessData {
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

  constructor(matches: Matches[]) {
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
    this.calculate();
  }

  private calculate() {
    this._totalGames = this._matches.length;

    for (let index = 0; index < this._matches.length; index += 1) {
      const { homeTeamGoals, awayTeamGoals } = this._matches[index];

      this._goalsFavor += homeTeamGoals;
      this._goalsOwn += awayTeamGoals;
      this.getMatchResult(homeTeamGoals, awayTeamGoals);
    }

    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._totalPoints = (this._totalVictories * 3) + this._totalDraws;
    this._efficiency = Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2));
  }

  private getMatchResult(homeTeamGoals: number, awayTeamGoals: number) {
    if (homeTeamGoals > awayTeamGoals) {
      this._totalVictories += 1;
    } else if (homeTeamGoals < awayTeamGoals) {
      this._totalLosses += 1;
    } else {
      this._totalDraws += 1;
    }
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

  totalData() {
    const points = this.pointsData();
    const goals = this.goalsData();
    return { ...goals, ...points };
  }
}

export default ProcessData;
