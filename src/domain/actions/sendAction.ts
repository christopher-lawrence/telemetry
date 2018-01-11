import { IAction } from './IAction';
import { ICookieManager } from '../cookieManager/ICookieManager';
import { ILogger } from '../../services/interfaces/iLogger';
import { IReportingService } from '../../services/interfaces/ireportingService';
import ConsoleReportingService from '../../services/consoleReportingService';
import { CookieManager } from '../cookieManager/cookieManager';
import LogService from '../../services/logService';
import { TelemetryModel } from '../telemetryModel';
import TelemetryEventModel from '../telemetryEventModel';

export class SendAction implements IAction {
    private reportingService: IReportingService;
    private cookieManager: ICookieManager;
    private logger: ILogger;

    constructor(reportingService?: IReportingService, cookieManager?: ICookieManager, logger?: ILogger) {
        this.logger = logger || LogService.getInstance();
        this.reportingService = reportingService || new ConsoleReportingService();
        this.cookieManager = cookieManager || new CookieManager(this.logger);
    }

    public action(parameters: any): void {
        const telemetryModel = new TelemetryModel(parameters);
        this.reportingService.report(telemetryModel);
    }
}
