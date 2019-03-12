const footballData = require('./footballData');

const totalStandings = standing => {
  return standing.stage === 'REGULAR_SEASON' && standing.type === 'TOTAL';
};

module.exports = async league => {
  const {
    data: { standings, competition }
  } = await footballData.get(
    `competitions/${league}/standings?stage=REGULAR_SEASON&standingType=TOTAL`
  );

  if (typeof standings === 'undefined') {
    throw new Error('Cannot fetch standings');
  }

  const regular = standings.find(totalStandings);

  if (typeof regular === 'undefined') {
    throw new Error('Total season standings not found');
  }

  if (typeof regular.table === 'undefined') {
    throw new Error('Cannot fetch table');
  }

  return {
    competition: competition.name,
    updated: new Date(competition.lastUpdated),
    table: regular.table.map(team => ({
      position: team.position,
      name: team.team.name,
      played: team.playedGames,
      won: team.won,
      draw: team.draw,
      lost: team.lost,
      points: team.points,
      scored: team.goalsFor,
      conceded: team.goalsAgainst,
      difference: team.goalDifference,
    }))
  }
};
