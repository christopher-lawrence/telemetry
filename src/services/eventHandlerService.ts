import { IEventHandlerService } from './interfaces/IEventHandlerService';
import LogService from './logService';
import { ICommandService } from './interfaces/iCommandService';
import { CommandService } from './commandService';
import { ILogger } from './interfaces/iLogger';

export default class EventHandlerService implements IEventHandlerService {
    private logger: ILogger;
    private commandService: ICommandService;

    constructor(logger?: ILogger, commandService?: ICommandService) {
        this.logger = logger || LogService.getInstance();
        this.commandService = commandService || CommandService.getInstance();
    }

    public handleDomContentLoadedEvent(event: Event): void {
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent creation time: ${event.timeStamp}`);

        this.logger.debug(`[handleDomContentLoadedEvent][Window]:DomContentLoadedEvent setTimeout begin ${Date.now()}`);

        /** TODO: Command service
         * - Remove this eventually
         */
        this.commandService.executeCommand('create', 'TA_00000', true);
    }

    public handleLoadEvent(event: Event): void {
        const requestStart = window.performance.timing.requestStart;
        /** TODO: Send performance information */
        const domContentLoadedEventStart = window.performance.timing.domContentLoadedEventStart;
        const domContentLoadedEventEnd = window.performance.timing.domContentLoadedEventEnd;
        // tslint:disable-next-line:max-line-length
        this.logger.debug(`[handleLoadEvent][Window]:DOM content load time (calculated): ${(domContentLoadedEventEnd - domContentLoadedEventStart)}`);
    }
}
