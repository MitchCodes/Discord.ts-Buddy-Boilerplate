import { LoggerInstance } from 'winston';
import { Provider } from 'nconf';
import { ExampleBot } from './bots/example-bot';
import { BotRestartSettings, BotManager } from 'discord.ts-buddy';

export class MainController {

    private logger: LoggerInstance;

    public startProgram(winstonLogger: LoggerInstance, conf: Provider) {
        this.logger = winstonLogger;
        this.logger.info('Starting bots.');

        let botToken: string = conf.get('botToken');
        if (botToken === undefined || botToken === null || botToken === "") {
            this.logger.error('No bot token is set for this program. Shutting down bot.');
            
            return;
        }

        // leave defaults
        let restartSettings: BotRestartSettings = new BotRestartSettings();

        let exampleBot: ExampleBot = new ExampleBot('Example Bot', botToken, winstonLogger, conf);
        let exampleBotManager: BotManager<ExampleBot> = new BotManager<ExampleBot>(exampleBot, restartSettings, winstonLogger);

        exampleBotManager.startBot();
    }

}
