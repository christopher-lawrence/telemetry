import { ITraversal } from '../models/traversal';
import { ICookieManager } from '../cookieManager/ICookieManager';
import { ILogger } from '../../services/interfaces/iLogger';
import { CookieManager } from '../cookieManager/cookieManager';
import LogService from '../../services/logService';
import { ICommander } from './interfaces/ICommander';

export class Commander implements ICommander {
    private cookieManger: ICookieManager;
    private logger: ILogger;
    private clientId: string;

    public constructor(clientId: string, cookieManager?: ICookieManager, logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.cookieManger = cookieManager || new CookieManager(this.logger);
        this.clientId = clientId;
    }

    public create(): void {
        const traversal: ITraversal = this.cookieManger.getTraversalCookie(this.clientId);
    }
    public send(): void {
        throw new Error('Method not implemented.');
    }
}
