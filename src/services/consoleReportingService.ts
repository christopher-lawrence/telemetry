import { IReportingService } from './interfaces/ireportingService';
import TelemetryEventModel from '../domain/models/telemetryEventModel';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import { IElementListener } from '../domain/ielementListener';
import { TelemetryModel } from '../domain/models/telemetryModel';

export default class ConsoleReportingService implements IReportingService {
    private logger: ILogger;

    public reportEvent(telemetryEvent: TelemetryEventModel): Promise<void> {
        const telemetryModel = new TelemetryModel(telemetryEvent);
        return this.report(telemetryModel);
    }

    public report(telemetryModel: TelemetryModel): Promise<void> {
        this.logger.info(telemetryModel.getDTO());
        return Promise.resolve();
    }

    constructor() {
        this.logger = LogService.getInstance();
    }
}
