import { ICommandService } from './interfaces/iCommandService';
import { ICommand } from '../domain/commands/interfaces/ICommand';
import CreateCommand from '../domain/commands/createCommand';
import { ICommander } from '../domain/framework/interfaces/ICommander';
import { Commander } from '../domain/framework/commander';
import { CommandAgent } from '../domain/framework/commandAgent';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { CreateAction } from '../domain/actions/createAction';

export class CommandService implements ICommandService {
    private static instance: CommandService;
    private commander: ICommander;
    private commandAgent: CommandAgent;
    private logger: ILogger;

    public static getInstance(): CommandService {
        if (!CommandService.instance) {
            CommandService.instance = new CommandService();
        }
        return CommandService.instance;
    }

    private constructor(logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.commandAgent = new CommandAgent(this.logger);
    }

    public executeCommand(command: string, ...parameters: any[]) {
        this.commandAgent.executeCommand(command);
    }

    public initializeCommands(clientId: string, captureAllEvents: boolean) {
        const createAction = new CreateAction(clientId, captureAllEvents);
        const create = new CreateCommand(createAction);
        this.commandAgent.addCommand(create);

        /** TODO: Add more commands here */
    }
}
