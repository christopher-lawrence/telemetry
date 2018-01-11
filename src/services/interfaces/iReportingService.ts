import TelemetryEventModel from '../../domain/telemetryEventModel';
import { TelemetryModel } from '../../domain/telemetryModel';

export interface IReportingService {
    reportEvent(telemetryEvent: TelemetryEventModel): void;
    report(telemetryModel: TelemetryModel): void;
}
