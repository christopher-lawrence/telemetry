import TelemetryEventModel from '../../domain/models/telemetryEventModel';
import { TelemetryModel } from '../../domain/models/telemetryModel';

export interface IReportingService {
    reportEvent(telemetryEvent: TelemetryEventModel): Promise<any>;
    report(telemetryModel: TelemetryModel): Promise<any>;
}
