export interface ICommandService {
    executeCommand(command: string, ...parameters: any[]): void;
}
