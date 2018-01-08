import { EventEmitter } from 'events';
import { IElementListener } from '../../domain/ielementListener';

export interface IEventHandlerService {
    handleDomContentLoadedEvent: (event: Event) => void;
    handleLoadEvent: (event: Event) => void;
    addTelemetryListener(element: IElementListener, handler?: (event: Event) => void): void;
}
