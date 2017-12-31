export interface ICommandService {
    executeCommand(command: string, ...parameters: any[]): void;
    initializeCommands(clientId: string, captureAllEvents: boolean): void;
}
