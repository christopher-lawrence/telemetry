import { ICommand } from './ICommand';
import { IAction } from '../actions/IAction';

export class SendCommand implements ICommand {
    private sendAction: IAction;

    public readonly name: string = 'send';

    public constructor(sendAction: IAction) {
        this.sendAction = sendAction;
    }

    public execute(...parameters: string[]): void {
        this.sendAction.action(...parameters);
    }
}
