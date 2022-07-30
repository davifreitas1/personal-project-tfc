import Teams from "../database/models/Teams";

class TeamsService {
  constructor(private model = Teams) { }

  async getAll() {
    const teams = await this.model.findAll();

    return {
      status: 200,
      data: teams,
    }
  }

  async getOne(id: number) {
    const team = await this.model.findOne({ where: { id } });

    return {
      status: 200,
      data: team,
    };
  }
}

export default TeamsService;