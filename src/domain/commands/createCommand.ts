import { ICommand } from './ICommand';
import { IAction } from '../actions/IAction';

export default class CreateCommand implements ICommand {
    private createAction: IAction;

    public readonly name: string = 'create';

    public execute(): void {
        this.createAction.action();
    }

    public constructor(createAction: IAction) {
        this.createAction = createAction;
    }
}
