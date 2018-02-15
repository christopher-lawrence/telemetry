import { IReportingService } from '../../src/services/interfaces/ireportingService';
import TelemetryEventModel from '../../src/domain/models/telemetryEventModel';
import { TelemetryModel } from '../../src/domain/models/telemetryModel';

export class MockReportingService implements IReportingService {
    public reportEventCalled: boolean = false;
    public reportEventCallCount: number = 0;
    public reportEventCallParameter: TelemetryEventModel;
    public reportCalled: boolean = false;
    public reportCallCount: number = 0;
    public reportCallParameter: TelemetryModel;

    public reportEvent(telemetryEvent: TelemetryEventModel): Promise<void> {
        this.reportEventCalled = true;
        this.reportEventCallCount++;
        this.reportEventCallParameter = telemetryEvent;
        return Promise.resolve();
    }
    public report(telemetryModel: TelemetryModel): Promise<void> {
        this.reportCalled = true;
        this.reportCallCount++;
        this.reportCallParameter = telemetryModel;
        return Promise.resolve();
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
