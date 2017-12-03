import { IParserService } from "./interfaces/iParserService";
import { IParser } from "../parsers/interfaces/iParser";
import DomParser from "../parsers/domParser";
import { IElementListener } from "../common/interfaces/iElementListener";
import { IListenerService } from "./interfaces/iListenerService";
import ListenerService from "./listenerService";
import { ILogger } from "./interfaces/iLogger";
import LogService from "./logService";

export default class ParserService implements IParserService {
    private parser: IParser;
    private logger: ILogger;
    private allElements: NodeListOf<Element>;

    constructor(allElements: NodeListOf<Element>) {
        this.parser = new DomParser();
        this.logger = LogService.getInstance();
        this.allElements = allElements;
    }

    public executeParsers(): IElementListener[] {
        const parsed = this.parser.parse(this.allElements);
        this.logger.debug(`[executeParsers]: Dom parser event count: ${parsed.length}`);
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
