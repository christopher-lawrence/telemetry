import EventHandlerService from './services/eventHandlerService';
import LogService from './services/logService';
import ConsoleLogger from './domain/framework/consoleLogger';
import ParserService from './services/parserService';

if (typeof (window) !== 'undefined') {
    const eventHandler = EventHandlerService.getInstance();
    LogService.initialize(new ConsoleLogger());

    window.addEventListener('DOMContentLoaded', (event: Event) => eventHandler.handleDomContentLoadedEvent(event));

    window.addEventListener('load', (event: Event) => eventHandler.handleLoadEvent(event));
}
