const leagues = new Set([
  'L1', 'BL2', 'BL3', 'DFB', 'PL', 'EL1', 'ELC', 'FAC', 'SA', 'SB', 'PD', 'SD',
  'CDR', 'FL1', 'FL2', 'DED', 'PPL', 'GSL', 'CL', 'EL', 'EC', 'WC'
]);

module.exports = league => leagues.has(league);
