export interface ILogger {
    debug(message?: any, ...optionalParameters: any[]): void;
    error(message?: any, ...optionalParameters: any[]): void;
    info(message?: any, ...optionalParameters: any[]): void;
}
