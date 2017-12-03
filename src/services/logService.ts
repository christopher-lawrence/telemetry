import { ILogger } from "./interfaces/iLogger";
import { IListener } from "../common/interfaces/ilistener";
import ConsoleLogger from "../domain/framework/consoleLogger";

export default class LogService {
    private static instance: LogService;
    private logger: ILogger;

    public static initialize(logger: ILogger): void {
        if (!LogService.instance) {
            LogService.instance = new LogService(logger);
        }
    }

    public static getInstance(): LogService {
        if (!LogService.instance) {
            /** Default to CosoleLogger */
            LogService.instance = new LogService(new ConsoleLogger());
        }

        return LogService.instance;
    }

    public debug(message?: any, ...optionalParameters: any[]) {
        this.logger.debug(message, optionalParameters);
    }

    public error(message?: any, ...optionalParameters: any[]) {
        this.logger.error(message, optionalParameters);
    }

    public info(message?: any, ...optionalParameters: any[]) {
        this.logger.info(message, optionalParameters);
    }

    private constructor(logger: ILogger) {
        this.logger = logger;
    }
}
