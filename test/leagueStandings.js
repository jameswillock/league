const leagueStandings = require('../leagueStandings');

const footballData = require('../footballData');
const MockAdapter = require('axios-mock-adapter');
const successfulResponse = require('./mocks/successfulResponse');
const responseWithoutTotal = require('./mocks/responseWithoutTotal');
const responseWithoutTable = require('./mocks/responseWithoutTable');
const responseWithoutStandings = require('./mocks/responseWithoutStandings');

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-as-promised'));

const mock = new MockAdapter(footballData);

const competition = 'PL';
const uri = `/competitions/${competition}/standings?stage=REGULAR_SEASON&standingType=TOTAL`;

describe('leagueStandings()', () => {
  context('when standings are missing', () => {
    it('Throws an error', async () => {
      mock.onGet(uri).reply(200, responseWithoutStandings)
      await expect(leagueStandings(competition)).to.be.rejectedWith('Cannot fetch standings')
    });
  });

  context('when regular season standings are missing', () => {
    it('Throws an error', async () => {
      mock.onGet(uri).reply(200, responseWithoutTotal);
      await expect(leagueStandings(competition)).to.be.rejectedWith('Total season standings not found')
    });
  });

  context('when regular season table is missing', () => {
    it('Throws an error', async () => {
      mock.onGet(uri).reply(200, responseWithoutTable);
      await expect(leagueStandings(competition)).to.be.rejectedWith('Cannot fetch table');
    });
  });

  context('when regular season standings are available', () => {
    before(() => mock.onGet(uri).reply(200, successfulResponse));

    it('Returns an object representing the league table', async () => {
      const standings = await leagueStandings(competition);
      expect(standings).to.be.an('object');
    });

    it('Returns an object with competition, updated and table keys', async () => {
      const standings = await leagueStandings(competition);
      expect(standings).to.be.have.keys(['competition', 'updated', 'table']);
    });

    it('Returns a nested table collection representing teams', async () => {
      const standings = await leagueStandings(competition);

      standings.table.forEach(team => {
        expect(team).to.have.keys(
          ['position', 'name', 'played', 'won', 'draw', 'lost', 'points', 'scored', 'conceded', 'difference']
        );
      });
    });
  });
});
