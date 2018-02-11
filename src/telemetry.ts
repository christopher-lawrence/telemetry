import EventHandlerService from './services/eventHandlerService';
import LogService from './services/logService';
import ConsoleLogger from './domain/framework/consoleLogger';
import ParserService from './services/parserService';
import { CommandService } from './services/commandService';
import { EventReportingService } from './services/eventReportingService';

if (typeof (window) !== 'undefined') {
    const eventHandler = EventHandlerService.getInstance();
    const commandService = CommandService.getInstance();
    const reportintService = new EventReportingService();
    /** TODO: Have a better default instead of having to call initialize */
    eventHandler.initialize(undefined, undefined, reportintService);
    commandService.intialize(undefined, reportintService);
    LogService.initialize(new ConsoleLogger());

    /** TODO: Command service
     * - Remove this eventually
     */
    commandService.executeCommand('create', 'TID_00000', true);
    commandService.executeCommand('send', {
        test: 'does this work?',
    });

    window.addEventListener('DOMContentLoaded', (event: Event) => eventHandler.handleDomContentLoadedEvent(event));

    window.addEventListener('load', (event: Event) => eventHandler.handleLoadEvent(event));
}
