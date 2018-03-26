import { LoggerInstance } from 'winston';
import { Provider } from 'nconf';
import { MultiGuildBot, CommandParser, CommandMatchingSettings, CommandMatchingType, 
        ICommand, ICommandFactory, ICommandResult } from 'discord.ts-buddy';
import { PingPongCommand } from '../commands/pingpong';
import { Message } from 'discord.js';

export class ExampleBot extends MultiGuildBot {

    constructor(passedBotName: string, passedBotToken: string, passedLogger: LoggerInstance, 
                passedConf: Provider) {
        super(passedBotName, passedBotToken, passedLogger, passedConf);
    }

    // tslint:disable-next-line:no-unnecessary-override
    public setupBot(): void {
        super.setupBot(); // not calling this does not do default setup code. 
        
        // any setup code (event handling, etc)
    }

    // This overrides the base class function because it does not have any.
    // This does not need to be called directly in this bot so-long as you call 'super.setupBot()' if you override setupBot
    public setupCommands(): CommandParser[] {
        let returnParsers: CommandParser[] = [];
        let availableCommands: ICommandFactory[] = [];

        // set up parser matching settings
        let commandParserSettings: CommandMatchingSettings = new CommandMatchingSettings();
        commandParserSettings.commandPartDelimiter = ' ';
        commandParserSettings.prefix = '!';
        commandParserSettings.matchingType = CommandMatchingType.prefixedOneWord;

        // set up commands
        let pingPongCommand: ICommandFactory = new PingPongCommand();
        availableCommands.push(pingPongCommand);
        
        // set up parser(s)
        returnParsers.push(new CommandParser(commandParserSettings, availableCommands));
        
        this.botInfo('Commands setup.');

        return returnParsers;
    }

    // This gets called automatically like setupCommands. It is called before each time execute is called.
    public setupCommandPreExecute(command: ICommand) {
        if (command instanceof PingPongCommand) {
            this.botInfo('Ping pong command pre-setup.');
        }
    }

    // Put this here simply to demonstrate that you can override this function 
    //  and completely change the behavior for executing commands if you want.
    // For example, you could put your own switch statement in here to do something different based on command type.
    // tslint:disable-next-line:no-unnecessary-override
    protected handleCommand(command: ICommand, msg: Message): Promise<ICommandResult> {
        return super.handleCommand(command, msg);
    }
}
