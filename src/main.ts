import { Logger, createLogger, transports } from 'winston';
import { mkdirSync } from 'fs';
import { MainController } from './logic/main.controller';
// tslint:disable-next-line:no-import-side-effect
import 'winston-daily-rotate-file';
import * as nconf from 'nconf';

// Configurations
nconf.argv().env();
nconf.file({ file: './build/config.json' });
nconf.defaults({
  botTokens: [],
});

// Logging
const fileTransport = new (<any>transports).DailyRotateFile({
  filename: 'bot-%DATE%.log',
  dirname: './logs/',
  datePattern: 'YYYY-MM-DD',
  maxFiles: 90,
});

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console(),
    fileTransport,
  ],
});

logger.info('Logger level: ' + logger.level);

let mainController : MainController = new MainController();
mainController.startProgram(logger, nconf);
