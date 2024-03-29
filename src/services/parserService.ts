import { IParserService } from './interfaces/iParserService';
import { IParser } from '../parsers/interfaces/iParser';
import DomParser from '../parsers/domParser';
import { IElementListener } from '../domain/iElementListener';
import { ILogger } from './interfaces/iLogger';
import LogService from './logService';
import JQueryParser from '../parsers/jqueryParser';
import JQuery13Parser from '../parsers/jquery13Parser';

export default class ParserService implements IParserService {
    private parsers: IParser[];
    private logger: ILogger;

    constructor() {
        this.parsers = [new DomParser(), new JQueryParser()];
        this.logger = LogService.getInstance();
    }

    public executeParsers(elements?: NodeListOf<Element>): IElementListener[] {
        let allElements;
        if (elements) {
            allElements = elements;
        } else {
            allElements = document.getElementsByTagName('*');
        }
        const parsed: IElementListener[] = [];
        let parser: IParser;
        let result: IElementListener[];
        let eventCount: number;
        for (let i = 0, iLen = this.parsers.length; i < iLen; i++) {
            parser = this.parsers[i];
            result = parser.parse(allElements);
            parsed.push(...result);
            eventCount = result.map((r) => r.listeners.length).reduce((a, b) => a + b, 0);
            this.logger.debug(
                // tslint:disable-next-line:max-line-length
                `[executeParsers]: ${parser.name()} finished. ${result.length} elements with ${eventCount} events found.`);
        }
        this.logger.debug(`[executeParsers]: Parsers finished. Elements with event count: ${parsed.length}`);
        return parsed;
    }

    private logElement(elementListener: IElementListener) {
        this.logger.debug(`node: ${elementListener.node}`);
        elementListener.listeners.forEach((l) => {
            this.logger.debug(`window.location: ${window.location}`);
            this.logger.debug(`func: ${l.func}`);
            this.logger.debug(`source: ${l.source}`);
            this.logger.debug(`type: ${l.type}`);
        });
    }
}
