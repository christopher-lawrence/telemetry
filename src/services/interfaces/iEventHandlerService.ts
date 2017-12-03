export interface IEventHandlerService {
    handleDomContentLoadedEvent: (event: Event) => void;
    handleLoadEvent: (event: Event) => void;
}
