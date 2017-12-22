import { IParser } from './interfaces/iParser';
import { IElementListener } from '../common/interfaces/ielementListener';
import { listenerCount } from 'cluster';
import { IListener } from '../common/interfaces/ilistener';
import Utilities from '../common/utilities';

/** Most of the types on jQuery seem to just be objects which is why there is so much 'any' in here */

export default class JQueryParser implements IParser {
    private parserName: string = 'jQuery';

    public name(): string {
        return this.parserName;
    }

    public parse(elements: NodeListOf<Element>): IElementListener[] {
        /** jQuery uses a cache for all event data. The elements are not needed */
        const result: IElementListener[] = [];
        result.push(...this.getJQueryFiveSix(), ...this.getJQueryFourSeven());

        return result;
    }

    private getJQueryFiveSix(): IElementListener[] {
        if (!this.globalJQueryExists() ||
            (Utilities.versionCompare(jQuery.fn.jquery, '<', '1.5') ||
                Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.7'))) {
            return [];
        }
        const result: IElementListener[] = [];
        for (const j in (jQuery as any).cache) {
            result.push(...this.handleJQuery((jQuery as any).cache[j]));
        }

        return result;
    }

    private getJQueryFourSeven(): IElementListener[] {
        if (!this.globalJQueryExists()) {
            return [];
        }

        if ((Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.4')
            && Utilities.versionCompare(jQuery.fn.jquery, '<', '1.5')) ||
            ((Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.7')
                && Utilities.versionCompare(jQuery.fn.jquery, '<', '1.9')))
        ) {
            return this.handleJQuery((jQuery as any).cache);
        }

        return [];
    }

    private globalJQueryExists(): boolean {
        return typeof (jQuery) !== 'undefined';
    }

    private handleJQuery(cache: any): IElementListener[] {
        const results: IElementListener[] = [];
        $.each(cache, (key: any, val: any) => {
            if (val.handle) {
                results.push(...this.getNodeEvents(val, val.handle.elem));
            }
        });

        return results;
    }

    private getNodeEvents(eventsObject: any, node: Node): IElementListener[] {
        if (typeof eventsObject !== 'object') {
            return [];
        }

        /** We are probably returning items -- set the name */
        this.parserName += jQuery.fn.jquery;

        let events;
        if (typeof eventsObject.events === 'object') {
            events = eventsObject.events;
        }

        if (!events) {
            events = ($ as any)._data(eventsObject, 'events');
        }

        let func;

        const foundElements: any[] = [];
        for (const type in events) {
            if (events.hasOwnProperty(type)) {
                if (type === 'live') {
                    continue;
                }

                const oEvents = events[type];

                for (const j in oEvents) {
                    /** #10 - jQuery 1.7
                     * - Problem: Reporting an extra event per element
                     * - Resolution: validate the event property is an object
                     */
                    if (oEvents.hasOwnProperty(j) && typeof oEvents[j] === 'object') {
                        const aNodes = [];
                        let sjQuery = this.parserName;

                        if (typeof oEvents[j].selector !== 'undefined' && oEvents[j].selector !== null) {
                            aNodes.push($(oEvents[j].selector, node));
                            sjQuery += ' (live event)';
                        } else {
                            aNodes.push(node);
                        }

                        const listeners: any[] = [];
                        for (let k = 0, kLen = aNodes.length; k < kLen; k++) {
                            if (typeof oEvents[j].origHandler !== 'undefined') {
                                func = oEvents[j].origHandler.toString();
                            } else if (typeof oEvents[j].handler !== 'undefined') {
                                func = oEvents[j].handler.toString();
                            } else {
                                func = oEvents[j].toString();
                            }
                            foundElements.push({
                                listeners: [{
                                    func: func,
                                    removed: false,
                                    source: sjQuery,
                                    type: type,
                                }],
                                node: aNodes[k],
                            });

                        }
                    }
                }
            }
        }

        return foundElements;
    }
}
