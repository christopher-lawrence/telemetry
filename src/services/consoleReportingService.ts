import { IReportingService } from './interfaces/ireportingService';
import TelemetryModel from '../domain/telemetryModel';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';

export default class ConsoleReportingService implements IReportingService {
    private logger: ILogger;

    public report(event: Event): void {
        this.logger.info(event);

        const telemetryModel = new TelemetryModel(event);

        this.logger.info(telemetryModel);
    }

    constructor() {
        this.logger = LogService.getInstance();
    }
}
