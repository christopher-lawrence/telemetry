import TelemetryEventModel from '../../domain/telemetryEventModel';
import { TelemetryModel } from '../../domain/telemetryModel';

export interface IReportingService {
    reportEvent(telemetryEvent: TelemetryEventModel): Promise<any>;
    report(telemetryModel: TelemetryModel): Promise<any>;
}
