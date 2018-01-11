import { IReportingService } from './interfaces/ireportingService';
import TelemetryEventModel from '../domain/telemetryEventModel';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { IElementListener } from '../domain/ielementListener';
import { TelemetryModel } from '../domain/telemetryModel';

export default class ConsoleReportingService implements IReportingService {
    private logger: ILogger;

    public reportEvent(telemetryEvent: TelemetryEventModel): void {
        this.logger.info(telemetryEvent);
    }

    public report(telemetryModel: TelemetryModel): void {
        this.logger.info(telemetryModel.getDTO());
    }

    constructor() {
        this.logger = LogService.getInstance();
    }
}
