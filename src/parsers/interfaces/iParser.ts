import { IElementListener } from "../../common/interfaces/ielementListener";

export interface IParser {
    parse(elements: NodeListOf<Element>): IElementListener[];
}

