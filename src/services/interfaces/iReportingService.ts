import { IElementListener } from '../../domain/ielementListener';

export interface IReportingService {
    reportEvent: (event: Event, telemetryElement: IElementListener) => void;
    report(): void;
}
