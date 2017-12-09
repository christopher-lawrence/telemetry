import { ILogger } from '../../services/interfaces/iLogger';

export default class ConsoleLogger implements ILogger {
    public debug(message?: any, ...optionalParameters: any[]): void {
        // tslint:disable-next-line:no-console
        console.debug(this.format(message), optionalParameters);
    }

    public error(message?: any, ...optionalParameters: any[]): void {
        // tslint:disable-next-line:no-console
        console.error(this.format(message), optionalParameters);
    }

    public info(message?: any, ...optionalParameters: any[]): void {
        // tslint:disable-next-line:no-console
        console.info(this.format(message), optionalParameters);
    }

    private format(message: any): string {
        if (typeof message === 'string') {
            return `[${Date.now()}] ${message}`;
        }
        return message;
    }
}
