import { IListener } from "./ilistener";

export interface IElementListener {
    node: Element;
    listeners: IListener[];
}
