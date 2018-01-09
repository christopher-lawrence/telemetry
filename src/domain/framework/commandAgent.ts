import { ICommand } from '../commands/ICommand';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
import EventHandlerService from '../../services/eventHandlerService';

export class CommandAgent {
    private commands: ICommand[];
    private logger: ILogger;
    private domLoaded: boolean;
    private queue: ICommandQueue[];

    public constructor(logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.commands = [];
        this.domLoaded = false;
        this.queue = [];
        this.listenForContentLoaded();
    }

    public addCommand(command: ICommand) {
        this.commands.push(command);
    }

    public executeCommand(commandName: string, ...parameters: string[]): void {
        if (!this.domLoaded) {
            this.queue.push({
                commandName: commandName,
                commandParameters: parameters,
            });
            return;
        }
        const command = this.commands.filter((c) => c.name === commandName);
        if (command) {
            command[0].execute(...parameters);
        } else {
            this.logger.error(`[CommandAgent:executeCommand] - Failed to find command ${commandName}`);
        }
    }

    private listenForContentLoaded(): void {
        const eventHandlerService = EventHandlerService.getInstance();
        eventHandlerService.addListener('contentloaded', () => {
            this.logger.debug(`[listenForContentLoaded] - Processing ${this.queue.length} items on the queue.`);
            this.domLoaded = true;
            this.queue.map((q) => this.executeCommand(q.commandName, ...q.commandParameters));
        });
    }
}

interface ICommandQueue {
    commandName: string;
    commandParameters: string[];
}
