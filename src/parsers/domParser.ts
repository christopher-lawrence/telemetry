import { IParser } from './interfaces/iparser';
import { IElementListener } from '../common/interfaces/ielementListener';
import EventTypes from '../common/eventTypes';
import { IListener } from '../common/interfaces/ilistener';

export default class DomParser implements IParser {
    public readonly name: string = "DOM 0 event";

    public parse(elements: NodeListOf<Element>): IElementListener[] {
        const foundElements: IElementListener[] = [];
        const iLength = elements.length, jLength = EventTypes.Types.length;
        const types = EventTypes.Types;

        for (let i = 0; i < iLength; i++) {
            const currentElement = elements[i];
            const listeners: IListener[] = [];
            for (let j = 0; j < jLength; j++) {
                if (typeof (currentElement as any)['on' + types[j]] == 'function') {
                    listeners.push({
                        type: types[j],
                        func: (currentElement as any)['on' + types[j]].toString(),
                        removed: false,
                        source: this.name
                    });
                }
            }
            if (listeners.length > 0) {
                foundElements.push({
                    node: currentElement,
                    listeners: listeners
                });
            }
        }
        return foundElements;
    };
}
