import { IReportingService } from '../../src/services/interfaces/ireportingService';
import TelemetryEventModel from '../../src/domain/telemetryEventModel';
import { TelemetryModel } from '../../src/domain/telemetryModel';

export class MockReportingService implements IReportingService {
    public reportEventCalled: boolean = false;
    public reportEventCallCount: number = 0;
    public reportEventCallParameter: TelemetryEventModel;
    public reportCalled: boolean = false;
    public reportCallCount: number = 0;
    public reportCallParameter: TelemetryModel;

    public reportEvent(telemetryEvent: TelemetryEventModel): void {
        this.reportEventCalled = true;
        this.reportEventCallCount++;
        this.reportEventCallParameter = telemetryEvent;
    }
    public report(telemetryModel: TelemetryModel): void {
        this.reportCalled = true;
        this.reportCallCount++;
        this.reportCallParameter = telemetryModel;
    }

    public resetReportEvent() {
        this.reportEventCallCount = 0;
        this.reportEventCalled = false;
    }

    public resetReport() {
        this.reportCallCount = 0;
        this.reportCalled = false;
    }

    public reset() {
        this.resetReport();
        this.resetReportEvent();
    }
}
