import { IAction } from './IAction';
import { ITraversalCookie } from '../models/traversalCookie';
import { ICookieManager } from '../cookieManager/ICookieManager';
import { CookieManager } from '../cookieManager/cookieManager';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
import ParserService from '../../services/parserService';
import { IParserService } from '../../services/interfaces/iparserService';
import EventHandlerService from '../../services/eventHandlerService';

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
        this.cookieManager.setTraversalInitCookie();
    }

    private startParsers() {
        this.logger.debug(`[createAction][startParsers]:setTimeout end ${Date.now()}`);
        this.logger.debug('[startParsers]: Starting parsers...');
        const parserService = new ParserService();
        const eventHanlderService = EventHandlerService.getInstance();
        const parsed = parserService.executeParsers();
        parsed.map((p) => eventHanlderService.addTelemetryListener(p));
    }
}
