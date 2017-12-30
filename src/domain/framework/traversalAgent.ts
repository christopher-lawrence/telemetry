import { ICommand } from '../commands/interfaces/ICommand';

export class TraversalAgent {
    /** TODO: queue commands
     * - Some kind of timeout to process queue??
     */
    private commandQueue: ICommand[];

    public executeCommand(command: ICommand) {
        command.execute();
    }
}
