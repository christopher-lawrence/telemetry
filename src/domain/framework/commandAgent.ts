import { ICommand } from '../commands/ICommand';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';

export class CommandAgent {
    /** TODO: queue commands
     * - Some kind of timeout to process queue??
     */
    private commands: ICommand[];
    private logger: ILogger;

    public constructor(logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.commands = [];
    }
    public addCommand(command: ICommand) {
        this.commands.push(command);
    }

    public executeCommand(commandName: string, ...parameters: string[]): void {
        const command = this.commands.filter((c) => c.name === commandName);
        if (command) {
            command[0].execute(...parameters);
        } else {
            this.logger.error(`[CommandAgent:executeCommand] - Failed to find command ${commandName}`);
        }
    }
}
