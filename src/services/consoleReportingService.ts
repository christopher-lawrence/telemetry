import { IReportingService } from './interfaces/ireportingService';
import TelemetryEventModel from '../domain/telemetryEventModel';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { IElementListener } from '../domain/ielementListener';

export default class ConsoleReportingService implements IReportingService {
    private logger: ILogger;

    public reportEvent(event: Event, telemetryElement: IElementListener): void {
        // this.logger.info(event);

        const telemetryModel = new TelemetryEventModel(event, telemetryElement);

        this.logger.info(telemetryModel);
    }

    public report(): void {
        throw new Error('Not implemented');
    }

    constructor() {
        this.logger = LogService.getInstance();
    }
}
