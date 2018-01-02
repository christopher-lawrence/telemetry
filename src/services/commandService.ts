import { ICommandService } from './interfaces/iCommandService';
import CreateCommand from '../domain/commands/createCommand';
import { CommandAgent } from '../domain/framework/commandAgent';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { CreateAction } from '../domain/actions/createAction';

export class CommandService implements ICommandService {
    private static instance: CommandService;
    private commandAgent: CommandAgent;
    private logger: ILogger;

    public static getInstance(): CommandService {
        if (!CommandService.instance) {
            CommandService.instance = new CommandService();
        }
        return CommandService.instance;
    }

    public executeCommand(command: string, ...parameters: any[]) {
        if (command === 'create' && parameters.length > 0) {
            const clientId = parameters[0];
            if (!this.validateClientId(clientId)) {
                this.logger.error(`Unknown clientId ${clientId}`);
                return;
            }
            const captureAllEvents = parameters.length > 1 ? parameters[1] : false;
            this.initializeCommands(parameters[0], captureAllEvents);
        }
        this.commandAgent.executeCommand(command);
    }

    private constructor(logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.commandAgent = new CommandAgent(this.logger);
    }

    private initializeCommands(clientId: string, captureAllEvents: boolean) {
        const createAction = new CreateAction(clientId, captureAllEvents);
        const create = new CreateCommand(createAction);
        this.commandAgent.addCommand(create);

        /** TODO: Add more commands here */
    }

    private validateClientId(clientId: string): boolean {
        return clientId === 'TA_00000';
    }
}
