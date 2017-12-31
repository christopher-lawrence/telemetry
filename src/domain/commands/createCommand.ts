import { ICommand } from './interfaces/ICommand';
import { ITraversal } from '../models/traversal';
import { ILogger } from '../../services/interfaces/iLogger';
import { CookieManager } from '../cookieManager/cookieManager';
import { ICookieManager } from '../cookieManager/ICookieManager';
import LogService from '../../services/logService';
import { ICommander } from '../framework/interfaces/ICommander';
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
