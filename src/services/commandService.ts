import { ICommandService } from './interfaces/iCommandService';
import { ICommand } from '../domain/commands/interfaces/ICommand';
import CreateCommand from '../domain/commands/createCommand';
import { ICommander } from '../domain/framework/interfaces/ICommander';
import { TraversalAgent } from '../domain/framework/traversalAgent';
import { Commander } from '../domain/framework/commander';

export class CommandService implements ICommandService {
    private commander: ICommander;
    private traversalAgent: TraversalAgent;

    public constructor() {
        this.traversalAgent = new TraversalAgent();
    }

    public executeCommand(command: string, ...parameters: any[]) {
        switch (command) {
            case 'create': {
                /** NOTE: Should create enable auto events? */
                const clientId = parameters[0];
                this.commander = new Commander(clientId);
                const createCommand = new CreateCommand(this.commander);
                this.traversalAgent.executeCommand(createCommand);
                break;
            }
            default: {
                // tslint:disable-next-line:no-console
                console.log(`unknown command ${command}`);
                break;
            }
        }
    }
}
