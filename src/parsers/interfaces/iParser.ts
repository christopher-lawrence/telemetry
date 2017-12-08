import { IElementListener } from "../../common/interfaces/ielementListener";

export interface IParser {
    getName(): string;
    parse(elements: NodeListOf<Element>): IElementListener[];
}

