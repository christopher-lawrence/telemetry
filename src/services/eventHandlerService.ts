import { IEventHandlerService } from "./interfaces/IEventHandlerService";
import { IParserService } from "./interfaces/iparserService";
import ParserService from "./parserService";
import { IListenerService } from "./interfaces/iListenerService";
import ListenerService from "./listenerService";
import { setTimeout } from "timers";
import LogService from "./logService";

export default class EventHandlerService implements IEventHandlerService {
    private parserService: IParserService;
    private addListenerService: IListenerService;
    private logger: LogService;

    constructor() {
        const allElements = document.getElementsByTagName("*");
        this.parserService = new ParserService(allElements);
        this.addListenerService = new ListenerService();
        this.logger = LogService.getInstance();
    }

    public handleDomContentLoadedEvent(event: Event): void {
        this.logger.debug("[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent creation time: " + event.timeStamp);

        setTimeout(() => this.startParsers(), 3000);
    }

    public handleLoadEvent(event: Event): void {
        const requestStart = window.performance.timing.requestStart;
        /** TODO: Send performance information */
        const domContentLoadedEventStart = window.performance.timing.domContentLoadedEventStart;
        const domContentLoadedEventEnd = window.performance.timing.domContentLoadedEventEnd;
        this.logger.debug("[handleLoadEvent][Window]:DOM content load time (calculated): " + (domContentLoadedEventEnd - domContentLoadedEventStart));
    }

    private startParsers() {
        this.logger.debug("[startParsers]: Starting parsers...");
        /** DOM is loaded -- start parsers */
        const parsed = this.parserService.executeParsers();
        parsed.map(p => this.addListenerService.AddListeners(p));
    }
}
