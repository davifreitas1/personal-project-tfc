import ILeader from '../interfaces/ILeader';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import ProcessData from './processData';

class LeaderboardService {
  private _teams: Teams[];
  private _matches: Matches[];
  private _leader: ILeader[];

  constructor(private teamsModel = Teams, private matchesModel = Matches) { }

  private sort() {
    this._leader = this._leader.sort((a, b) => a.goalsOwn - b.goalsOwn);
    this._leader = this._leader.sort((a, b) => b.goalsFavor - a.goalsFavor);
    this._leader = this._leader.sort((a, b) => b.goalsBalance - a.goalsBalance);
    this._leader = this._leader.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  private async getTeamsAndMatches() {
    this._teams = await this.teamsModel.findAll();
    this._matches = await this.matchesModel.findAll({ where: { inProgress: false } });
  }

  private teamsMatchesHome() {
    this._leader = this._teams.map((team) => {
      const { teamName } = team;
      const teamMatches = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new ProcessData(teamMatches, team.id);
      const matchesData = data.homeData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  private teamsMatchesAway() {
    this._leader = this._teams.map((team) => {
      const { teamName } = team;
      const teamMatches = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new ProcessData(teamMatches, team.id);
      const matchesData = data.awayData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  private teamsMatchesTotal() {
    this._leader = this._teams.map((team) => {
      const { teamName } = team;
      const teamMatches = this._matches.filter((match) => (
        match.homeTeam === team.id || match.awayTeam === team.id
      ));
      const data = new ProcessData(teamMatches, team.id);
      const matchesData = data.totalData();
      const result = {
        ...matchesData,
        name: teamName,
      };
      return result;
    });
    this.sort();
  }

  async home() {
    await this.getTeamsAndMatches();
    this.teamsMatchesHome();
    return this._leader;
  }

  async away() {
    await this.getTeamsAndMatches();
    this.teamsMatchesAway();
    return this._leader;
  }

  async total() {
    await this.getTeamsAndMatches();
    this.teamsMatchesTotal();
    return this._leader;
  }
}

export default LeaderboardService;
