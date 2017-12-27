import { IEventHandlerService } from './interfaces/IEventHandlerService';
import { IParserService } from './interfaces/iparserService';
import ParserService from './parserService';
import { IListenerService } from './interfaces/iListenerService';
import ListenerService from './listenerService';
import { setTimeout } from 'timers';
import LogService from './logService';
import { IParser } from '../parsers/interfaces/iParser';

export default class EventHandlerService implements IEventHandlerService {
    private parserService: IParserService;
    private listenerService: IListenerService;
    private logger: LogService;

    constructor(parserService: IParserService, listenerService: IListenerService) {
        this.parserService = parserService;
        this.listenerService = listenerService;
        this.logger = LogService.getInstance();
    }

    public handleDomContentLoadedEvent(event: Event): void {
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent creation time: ${event.timeStamp}`);

        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent setTimeout begin ${Date.now()}`);
        setTimeout(() => this.startParsers(), 1000);
    }

    public handleLoadEvent(event: Event): void {
        const requestStart = window.performance.timing.requestStart;
        /** TODO: Send performance information */
        const domContentLoadedEventStart = window.performance.timing.domContentLoadedEventStart;
        const domContentLoadedEventEnd = window.performance.timing.domContentLoadedEventEnd;
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleLoadEvent][Window]:DOM content load time (calculated): ${(domContentLoadedEventEnd - domContentLoadedEventStart)}`);
    }

    private startParsers() {
        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent setTimeout end ${Date.now()}`);
        this.logger.debug('[startParsers]: Starting parsers...');
        /** DOM is loaded -- start parsers */
        const parsed = this.parserService.executeParsers();
        parsed.map((p) => this.listenerService.AddListeners(p));
    }
}
