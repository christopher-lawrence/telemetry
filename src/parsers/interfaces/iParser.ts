import { IElementListener } from "../../common/interfaces/ielementListener";

export interface IParser {
    name: string;
    parse(elements: NodeListOf<Element>): IElementListener[];
}

