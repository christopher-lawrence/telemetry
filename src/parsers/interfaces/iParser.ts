import { IElementListener } from '../../domain/ielementListener';

export interface IParser {
    name(): string;
    parse(elements: NodeListOf<Element>): IElementListener[];
}
