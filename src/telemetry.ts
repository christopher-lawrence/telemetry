import EventHandlerService from "./services/eventHandlerService";
import LogService from "./services/logService";
import ConsoleLogger from "./domain/framework/consoleLogger";

if (typeof (window) !== 'undefined') {
    const eventHandler = new EventHandlerService();
    LogService.initialize(new ConsoleLogger());

    window.addEventListener("DOMContentLoaded", (event: Event) => eventHandler.handleDomContentLoadedEvent(event));

    window.addEventListener("load", (event: Event) => eventHandler.handleLoadEvent(event));
}
