import * as wins from 'winston';
import * as nconf from 'nconf';

describe('maincontroller tests', () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  // Act before assertions
  beforeAll(async () => {
    jest.runOnlyPendingTimers();

    nconf.file({ file: '../config.common.json' });
    nconf.defaults({
      botTokens: [],
    });

    let logger = new wins.Logger({
      level: 'debug',
      transports: [
        new (wins.transports.Console)(),
      ],
    });
  });

  it('true is indeed true', () => {
    expect(true).toBeTruthy();
  });

});
