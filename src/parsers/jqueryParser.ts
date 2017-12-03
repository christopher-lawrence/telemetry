import { IParser } from "./interfaces/iParser";
import { IElementListener } from "../common/interfaces/ielementListener";

export default class JQueryParser implements IParser {
    parse(elements: NodeListOf<Element>): IElementListener[] {
        throw new Error("Not implemented");
    }

}
