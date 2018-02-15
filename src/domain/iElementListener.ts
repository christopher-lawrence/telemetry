import { IListener } from './IListener';

export interface IElementListener {
    node: Element;
    listeners: IListener[];
}
