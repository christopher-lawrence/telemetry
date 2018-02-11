import { IReportingService } from './interfaces/ireportingService';
import TelemetryEventModel from '../domain/telemetryEventModel';
import { TelemetryModel } from '../domain/telemetryModel';
import { ConfigService } from './configService';
import axios, { AxiosResponse } from 'axios';

export class EventReportingService implements IReportingService {
    public reportEvent(telemetryEvent: TelemetryEventModel): Promise<AxiosResponse> {
        const telemetryModel = new TelemetryModel(telemetryEvent);
        return this.report(telemetryModel);
    }
    public report(telemetryModel: TelemetryModel): Promise<AxiosResponse> {
        const dto = telemetryModel.getDTO();
        return this.sendEvent(dto);
    }

    public constructor() {
        if (!axios.defaults.baseURL) {
            axios.defaults.baseURL = ConfigService.getInstance().webServer;
        }
    }

    private sendEvent(data: TelemetryModel): Promise<AxiosResponse> {
        return axios({
            data: data,
            method: 'POST',
            url: '/telemetry/event',
        });
    }
}
