const chai = require('chai');
const expect = chai.expect;
const supportedLeague = require('../supportedLeague');

describe('supportedLeague()', () => {
  context('given a supported league code', () => {
    it('should return true', () => {
      expect(supportedLeague('PL')).to.be.true;
    });
  });

  context('given an unsupported league code', () => {
    it('should return true', () => {
      expect(supportedLeague('EPL')).to.be.false;
    });
  });

  context('given a blank league code', () => {
    it('should return false', () => {
      expect(supportedLeague('')).to.be.false;
    });
  });

  context('missing a league code', () => {
    it('should return false', () => {
      expect(supportedLeague()).to.be.false;
    });
  });

  it('supports all the expected league codes', () => {
    [
      'L1', 'BL2', 'BL3', 'DFB', 'PL', 'EL1', 'ELC', 'FAC', 'SA', 'SB', 'PD', 'SD',
      'CDR', 'FL1', 'FL2', 'DED', 'PPL', 'GSL', 'CL', 'EL', 'EC', 'WC'
    ].forEach(code => expect(supportedLeague(code)).to.be.true);
  });
});
