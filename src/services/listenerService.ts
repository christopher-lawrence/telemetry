import EventNames from '../common/eventNames';
import EventHandler from '../services/eventHandlerService';
import { IEventHandlerService } from '../services/interfaces/ieventHandlerService';
import EventHandlerService from '../services/eventHandlerService';
import { IElementListener } from '../common/interfaces/ielementListener';
import { IListenerService } from './interfaces/iListenerService';
import { IReportingService } from './interfaces/ireportingService';
import ConsoleReportingService from './consoleReportingService';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';

export default class ListenerService implements IListenerService {
    private reportingService: IReportingService;
    private logger: ILogger;

    constructor() {
        this.reportingService = new ConsoleReportingService();
        this.logger = LogService.getInstance();
    }

    public AddListeners(element: IElementListener, handler?: (event: Event) => void) {
        const listeners = element.listeners;
        listeners.map((l) =>
            element.node.addEventListener(l.type, (event) => handler
                ? handler(event) : this.defaultEventHandler(event, element)));
    }

    private defaultEventHandler(event: Event, element: IElementListener): void {
        this.logger.debug('[EventHandlerService]:[handleInitialEvent]');
        this.reportingService.report(event, element);
    }
}
