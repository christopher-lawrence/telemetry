import { IElementListener } from '../../domain/ielementListener';

export interface IReportingService {
    report: (event: Event, telemetryElement: IElementListener) => void;
}
