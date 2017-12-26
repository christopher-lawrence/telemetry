import EventNames from '../common/eventNames';
import EventHandler from '../services/eventHandlerService';
import { IEventHandlerService } from '../services/interfaces/ieventHandlerService';
import EventHandlerService from '../services/eventHandlerService';
import { IElementListener } from '../domain/ielementListener';
import { IListenerService } from './interfaces/iListenerService';
import { IReportingService } from './interfaces/ireportingService';
import ConsoleReportingService from './consoleReportingService';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { IListener } from '../domain/iListener';

export default class ListenerService implements IListenerService {
    private reportingService: IReportingService;
    private logger: ILogger;

    constructor() {
        this.reportingService = new ConsoleReportingService();
        this.logger = LogService.getInstance();
    }

    public AddListeners(element: IElementListener, handler?: (event: Event) => void) {
        const listeners = element.listeners;
        /** If there are multiple listeners of the same type:
         * - Group into a single listener since we are sending the same IElementListener with each event.
         */
        const grouped: IListener[] = listeners.reduce((p: IListener[], c: IListener) => {
            if (p.filter((l) => l.type === l.type).length > 0) {
                return p;
            }
            p.push(c);
            return p;
        }, []);
        grouped.map((g: IListener) =>
            element.node.addEventListener(g.type, (event) => handler
                ? handler(event) : this.defaultEventHandler(event, element)));
    }

    private defaultEventHandler(event: Event, element: IElementListener): void {
        this.logger.debug('[EventHandlerService]:[handleInitialEvent]');
        this.reportingService.report(event, element);
    }
}
