import { ICommand } from './interfaces/ICommand';
import { ITraversal } from '../models/traversal';
import { ILogger } from '../../services/interfaces/iLogger';
import { CookieManager } from '../cookieManager/cookieManager';
import { ICookieManager } from '../cookieManager/ICookieManager';
import LogService from '../../services/logService';
import { ICommander } from '../framework/interfaces/ICommander';

export default class CreateCommand implements ICommand {
    private commander: ICommander;

    public execute(): void {
        this.commander.create();
    }

    public constructor(commander: ICommander) {
        this.commander = commander;
    }
}
