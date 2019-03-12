const StandingStore = require('../StandingsStore');

const chai = require('chai');
chai.use(require('chai-datetime'));
const expect = chai.expect;

describe('StandingsStore', () => {
  context('when competition exists on disk', () => {
    const store = new StandingStore('PL');

    describe('outdatedTime()', () => {
      it('Returns the current time, plus ten minutes', () => {
        const time = new Date(store.now.getTime() + 600);
        expect(store.outdatedTime()).to.equalTime(time);
      });
    });

    describe('standingsFromFile()', () => {
      it('Does something', () => {

      });
    });
  });
});
