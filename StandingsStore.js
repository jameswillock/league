const path = require('path');
const fs = require('fs');
const leagueStandings = require('./leagueStandings');

class StandingsStore {
  constructor(competition) {
    this.competition = competition;
    this.now = new Date();
  }

  outdatedTime() {
    return new Date(this.now.getTime() + 600);
  }

  standingsFromFile() {
    const databasePath = path.join(__dirname, 'database.json');
    return JSON.parse(fs.readFileSync(databasePath, 'utf8'));
  }

  async standingsForCompetition() {
    const standings = this.standingsFromFile();
    const competition = standings['competitions'][this.competition];

    if (typeof competition === 'undefined' || competition.updated > this.outdatedTime()) {
      const updatedStandings = await this.standingsFromAPI();
      this.writeStandingsToFile(updatedStandings);
      return updatedStandings;
    }

    return standings['competitions'][this.competition];
  }

  async standingsFromAPI() {
    return await leagueStandings(this.competition);
  }

  writeStandingsToFile(standings) {
    const allStandings = this.standingsFromFile();
    allStandings['competitions'][this.competition] = standings;
    fs.writeFileSync('database.json', JSON.stringify(allStandings, null, 2));
  }
}

module.exports = StandingsStore;
