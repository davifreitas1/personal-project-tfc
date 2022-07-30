import Teams from "../database/models/Teams";

class TeamsService {
  async getAll() {
    const teams = await Teams.findAll();
    
    return {
      status: 200,
      data: teams,
    }
  }

  async getOne(id: number) {
    const team = await Teams.findOne({ where: { id } });

    return {
      status: 200,
      data: team,
    };
  }
}

export default TeamsService;