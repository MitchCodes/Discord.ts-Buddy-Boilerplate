import * as wins from 'winston';
import { MainController } from './logic/main.controller';
// tslint:disable-next-line:no-import-side-effect
import 'winston-daily-rotate-file';
import * as nconf from 'nconf';

// Configurations
nconf.argv().env();
nconf.file({ file: './config.json' });
nconf.defaults({
  botTokens: [],
});

// Logging
const fileTransport = new wins.transports.DailyRotateFile({
  filename: 'logs',
  datePattern: '/yyyy/MM/bot-yyyy-MM-dd.log',
  maxDays: 90,
  createTree: true,
});

const logger = new wins.Logger({
  level: 'debug',
  transports: [
    new (wins.transports.Console)(),
    fileTransport,
  ],
});

logger.info('Logger level: ' + logger.level);

let mainController : MainController = new MainController();
mainController.startProgram(logger, nconf);
