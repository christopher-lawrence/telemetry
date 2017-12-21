import { IParser } from './interfaces/iparser';
import { IElementListener } from '../common/interfaces/ielementListener';
import EventTypes from '../common/eventTypes';
import { IListener } from '../common/interfaces/ilistener';

export default class DomParser implements IParser {
    private parserName: string = 'DOM';

    public name(): string {
        return this.parserName;
    }

    public parse(elements: NodeListOf<Element>): IElementListener[] {
        const foundElements: IElementListener[] = [];
        const iLength = elements.length, jLength = EventTypes.Types.length;
        const types = EventTypes.Types;

        for (let i = 0; i < iLength; i++) {
            const currentElement = elements[i];
            const listeners: IListener[] = [];
            for (let j = 0; j < jLength; j++) {
                /** TODO: an element with multiple of the same type seem to always return
                 * the same function
                 */
                if (typeof (currentElement as any)[`on${types[j]}`] === 'function') {
                    listeners.push({
                        func: (currentElement as any)[`on${types[j]}`].toString(),
                        removed: false,
                        source: this.parserName,
                        type: types[j],
                    });
                }
            }
            if (listeners.length > 0) {
                foundElements.push({
                    listeners: listeners,
                    node: currentElement,
                });
            }
        }
        return foundElements;
    }
}
