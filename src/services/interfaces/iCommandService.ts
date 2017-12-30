// tslint:disable-next-line:no-empty-interface
export interface ICommandService {
    executeCommand(command: string, ...parameters: any[]): void;
}
