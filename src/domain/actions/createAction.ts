import { IAction } from './IAction';
import { ITraversal } from '../models/traversal';
import { ICookieManager } from '../cookieManager/ICookieManager';
import { CookieManager } from '../cookieManager/cookieManager';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
import ParserService from '../../services/parserService';
import { IParserService } from '../../services/interfaces/iparserService';
import ListenerService from '../../services/listenerService';

export class CreateAction implements IAction {
    private cookieManager: ICookieManager;
    private clientId: string;
    private logger: ILogger;
    private captureAllEvents: boolean;

    public constructor(clientId: string, captureAllEvents: boolean, cookieManager?: ICookieManager, logger?: ILogger) {
        this.clientId = clientId;
        this.cookieManager = cookieManager || new CookieManager();
        this.logger = logger || LogService.getInstance();
        this.captureAllEvents = captureAllEvents;
    }

    public action(): void {
        const traversal = this.cookieManager.netTraversalCookie(this.clientId);
        if (!traversal) {
            this.logger.error(`Unable to find clientId ${this.clientId}`);
            return;
        }
        if (this.captureAllEvents) {
            setTimeout(() => this.startParsers(), 1000);
        }
    }

    private startParsers() {
        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent setTimeout end ${Date.now()}`);
        this.logger.debug('[startParsers]: Starting parsers...');
        /** DOM is loaded -- start parsers */
        const parserService = new ParserService();
        const listenerService = new ListenerService();
        const parsed = parserService.executeParsers();
        parsed.map((p) => listenerService.AddListeners(p));
    }
}
