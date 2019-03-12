const Table = require('cli-table3');

module.exports = standings => {
  const headers = ['', 'Team', 'P', 'W', 'D', 'L', '+', '-', 'GD', 'Pts'];

  const table = new Table({
    wordWrap: true,
    colWidths: [null, 15],
    head: headers
  });

  standings.table.forEach(standing => {
    table.push([
      standing.position,
      standing.name,
      standing.played,
      standing.won,
      standing.draw,
      standing.lost,
      standing.scored,
      standing.conceded,
      standing.difference,
      standing.points,
    ]);
  });

  return table.toString();
};
