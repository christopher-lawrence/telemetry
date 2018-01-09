import { IEventHandlerService } from './interfaces/IEventHandlerService';
import LogService from './logService';
import { ICommandService } from './interfaces/iCommandService';
import { CommandService } from './commandService';
import { ILogger } from './interfaces/iLogger';
import { EventEmitter } from 'events';
import { ICommand } from '../domain/commands/ICommand';
import { IElementListener } from '../domain/ielementListener';
import { IListener } from '../domain/ilistener';
import { IReportingService } from './interfaces/ireportingService';
import ConsoleReportingService from './consoleReportingService';
import TelemetryEventModel from '../domain/telemetryEventModel';

export default class EventHandlerService implements IEventHandlerService {
    private static instance: EventHandlerService;
    private eventEmitter: EventEmitter;
    private logger: ILogger;
    private reportingService: IReportingService;

    public static getInstance(): EventHandlerService {
        if (!EventHandlerService.instance) {
            EventHandlerService.instance = new EventHandlerService();
        }
        return EventHandlerService.instance;
    }

    // tslint:disable:align
    public static initialize(logger?: ILogger, commandService?: ICommandService,
        eventEmitter?: EventEmitter, reportingService?: IReportingService): void {
        if (!EventHandlerService.instance) {
            EventHandlerService.instance = new EventHandlerService(logger, commandService, eventEmitter);
        }
    }

    public on(event: string, listener: (...args: any[]) => void): this {
        this.eventEmitter.on(event, listener);
        return this;
    }

    public addListener(event: string, listener: (...args: any[]) => void): this {
        this.eventEmitter.addListener(event, listener);
        return this;
    }

    public emit(event: string, ...args: any[]): this {
        this.eventEmitter.emit(event, args);
        return this;
    }

    public handleDomContentLoadedEvent(event: Event): void {
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent creation time: ${event.timeStamp}`);

        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent setTimeout begin ${Date.now()}`);

        /** Let the command agent know we are loaded */
        this.emit('contentloaded');

    }

    public handleLoadEvent(event: Event): void {
        const requestStart = window.performance.timing.requestStart;
        /** TODO: Send performance information */
        const domContentLoadedEventStart = window.performance.timing.domContentLoadedEventStart;
        const domContentLoadedEventEnd = window.performance.timing.domContentLoadedEventEnd;
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleLoadEvent][Window]:DOM content load time (calculated): ${(domContentLoadedEventEnd - domContentLoadedEventStart)}`);
    }

    public handleTelemetryEvent(event: Event): void {
        this.logger.debug(`[handleTelemetryEvent]:Event captured ${event}`);
    }

    public addTelemetryListener(element: IElementListener, handler?: (event: Event) => void) {
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
        this.logger.debug('[EventHandlerService]:[defaultEventHandler]');
        const telemetryEvent = new TelemetryEventModel(event, element);
        this.reportingService.reportEvent(telemetryEvent);
    }

    private constructor(logger?: ILogger, commandService?: ICommandService,
        eventEmitter?: EventEmitter, reportingService?: IReportingService) {
        this.logger = logger || LogService.getInstance();
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.reportingService = reportingService || new ConsoleReportingService();

        this.setup();
    }

    private setup(): void {
        this.addListener('telemetry', (...args) => this.handleTelemetryEvent(args[0]));
    }
}
