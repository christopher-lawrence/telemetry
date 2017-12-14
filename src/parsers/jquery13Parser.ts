import { IParser } from './interfaces/iParser';
import { IElementListener } from '../common/interfaces/ielementListener';
import Utilities from '../common/utilities';
import { IListener } from '../common/interfaces/ilistener';

/** NOTE: jQuery <= 1.3
 * - These versions of jQuery auto add an unload and load (in that order) event
 * to the Window.  Expect an extra Element with two events attached to it.
 * - TODO: Figure out a way to remove these...
 */

export default class JQuery13Parser implements IParser {
    private parserName: string = 'jQuery';

    public name(): string {
        return this.parserName;
    }

    public parse(elements: NodeListOf<Element>): IElementListener[] {
        const result: IElementListener[] = [];
        result.push(...this.getElements(), ...this.getLiveElements());
        return result;
    }

    private getElements(): IElementListener[] {
        if (!jQuery || Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.4')) {
            return [];
        }

        /** Set name to include jQuery version */
        this.parserName += jQuery.fn.jquery;

        const foundElements: IElementListener[] = [];
        const cache = (jQuery as any).cache;

        for (const i in cache) {
            const listeners: IListener[] = [];
            if (typeof cache[i].events === 'object') {
                const nEventNode = cache[i].handle.elem;

                for (const type in cache[i].events) {
                    const oEvent = cache[i].events[type];
                    let iFunctionIndex: any;
                    for (iFunctionIndex in oEvent) {
                        break;
                    }

                    const func = oEvent[iFunctionIndex].toString();
                    listeners.push({
                        func: func,
                        removed: false,
                        source: this.parserName,
                        type: type,
                    });
                }
                foundElements.push({
                    listeners: listeners,
                    node: nEventNode,
                });
            }
        }
        return foundElements;
    }

    private getLiveElements(): IElementListener[] {
        if (!jQuery || (jQuery.fn as any).live !== 'undefined' ||
            typeof jQuery.data === 'undefined' ||
            typeof jQuery.data(document as any, 'events') === 'undefined' ||
            typeof jQuery.data(document as any, 'events').live === 'undefined') {
            return [];
        }

        const elements: IElementListener[] = [];
        jQuery.each(jQuery.data(document as any, 'events').live || [], function (i, fn) {
            let event = fn.type.split('.');
            event = event[0];
            const selector = fn.data;

            const listeners: IListener[] = [];
            $(selector).each(() => {
                listeners.push({
                    func: 'Unable to obtain function for live() bound event',
                    removed: false,
                    source: `${this.parserName} (live)`,
                    type: event,
                });
            });
            elements.push({
                listeners: listeners,
                node: this,
            });
        });

        return elements;
    }
}
