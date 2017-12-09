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
        /** jQuery 1.5 and 1.6 use a cache for all event data. The elements are not needed */
        const result: IElementListener[] = [];
        result.push(...this.getJQueryFiveSix());

        return result;
    }

    private getJQueryFiveSix(): IElementListener[] {
        if (!this.globalJQueryExists() ||
            Utilities.versionCompare(jQuery.fn.jquery, '<', '1.5') ||
            Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.7')) {
            return [];
        }
        this.parserName += '1.5_1.6';
        const result: IElementListener[] = [];
        for (const j in (jQuery as any).cache) {
            result.push(...this.handleJQuery((jQuery as any).cache[j]));
        }

        return result;
    }

    private globalJQueryExists(): boolean {
        return jQuery !== undefined;
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
        let events;
        if (typeof eventsObject.events === 'object') {
            events = eventsObject.events;
        }

        if (!events) {
            events = $.data(eventsObject, 'events');
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
                    if (oEvents.hasOwnProperty(j)) {
                        const aNodes = [];
                        let sjQuery = 'jQuery' + jQuery.fn.jquery;

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
