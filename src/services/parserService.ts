import { IParserService } from "./interfaces/iParserService";
import { IParser } from "../parsers/interfaces/iParser";
import DomParser from "../parsers/domParser";
import { IElementListener } from "../common/interfaces/iElementListener";
import { IListenerService } from "./interfaces/iListenerService";
import ListenerService from "./listenerService";
import { ILogger } from "./interfaces/iLogger";
import LogService from "./logService";
import JQueryParser from "../parsers/jqueryParser";

export default class ParserService implements IParserService {
    private parsers: IParser[];
    private logger: ILogger;
    private allElements: NodeListOf<Element>;

    constructor(allElements: NodeListOf<Element>) {
        this.parsers = [new DomParser(), new JQueryParser()];
        this.logger = LogService.getInstance();
        this.allElements = allElements;
    }

    public executeParsers(): IElementListener[] {
        const parsed: IElementListener[] = [];
        let parser: IParser;
        let result: IElementListener[];
        for (let i = 0, iLen = this.parsers.length; i < iLen; i++) {
            parser = this.parsers[i];
            result = parser.parse(this.allElements);
            parsed.push(...result);
            this.logger.debug(`[executeParsers]: ${parser.name} finished. ${result.length} elements with events found.`);
        }
        this.logger.debug(`[executeParsers]: Parsers finished. Elements with event count: ${parsed.length}`);
        return parsed;
    }

    private logElement(elementListener: IElementListener) {
        this.logger.debug(`node: ${elementListener.node}`);
        elementListener.listeners.forEach(l => {
            this.logger.debug(`window.location: ${window.location}`);
            this.logger.debug(`func: ${l.func}`);
            this.logger.debug(`removed: ${l.removed}`);
            this.logger.debug(`source: ${l.source}`);
            this.logger.debug(`type: ${l.type}`);
        });
    }
}
