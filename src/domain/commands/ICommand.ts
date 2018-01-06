export interface ICommand {
    name: string;
    execute(...parameters: string[]): void;
}
