import { IParser } from './interfaces/iParser';
import { IElementListener } from '../domain/ielementListener';
import { IListener } from '../domain/ilistener';
import Utilities from '../common/utilities';
import JQuery13Parser from './jquery13Parser';

/** Most of the types on jQuery seem to just be objects which is why there is so much 'any' in here */

export default class JQueryParser implements IParser {
    private parserName: string = 'jQuery';

    public name(): string {
        return this.parserName;
    }

    public parse(elements: NodeListOf<Element>): IElementListener[] {
        /** jQuery uses a cache for all event data. The elements are not needed */
        const jquery13: JQuery13Parser = new JQuery13Parser();
        const result: IElementListener[] = jquery13.parse(elements);
        if (result.length > 0) {
            this.parserName = jquery13.name();
        }
        result.push(...this.getJQueryFiveSix(), ...this.getJQueryFourSeven(), ...this.getJQueryTwo());

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
                && Utilities.versionCompare(jQuery.fn.jquery, '<', '1.13')))
        ) {
            return this.handleJQuery((jQuery as any).cache);
        }

        return [];
    }

    /** jQuery 2.2
     * Each element contains its own cache -- $._data(element)
     */
    private getJQueryTwo(): IElementListener[] {
        if (!this.globalJQueryExists()) {
            return [];
        }

        const result: IElementListener[] = [];
        if (Utilities.versionCompare(jQuery.fn.jquery, '>=', '2.2') &&
            Utilities.versionCompare(jQuery.fn.jquery, '<', '3.3')) {
            const self = this;
            // tslint:disable-next-line:only-arrow-functions
            $('*').each(function (index) {
                const eventData = ($ as any)._data(this);
                if (typeof eventData.events === 'object') {
                    result.push(...self.getNodeEvents(($ as any)._data(this), this));
                }
            });
        }

        return result;
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
        this.parserName = `jQuery ${jQuery.fn.jquery}`;

        let events;
        if (typeof eventsObject.events === 'object') {
            events = eventsObject.events;
        }

        if (!events) {
            events = ($ as any)._data(eventsObject, 'events');
        }

        let func;

        /** One element can have many listeners
         * -- types are grouped
         * -- one element per type
         */
        const foundElements: IElementListener[] = [];
        for (const type in events) {
            if (events.hasOwnProperty(type)) {
                if (type === 'live') {
                    continue;
                }

                const oEvents = events[type];

                const listeners: IListener[] = [];
                let aNode: any;
                for (const j in oEvents) {
                    /** #10 - jQuery 1.7
                     * - Problem: Reporting an extra event per element
                     * - Resolution: validate the event property is an object
                     */
                    if (oEvents.hasOwnProperty(j) && typeof oEvents[j] === 'object') {
                        let sjQuery = this.parserName;

                        if (typeof oEvents[j].selector !== 'undefined' && oEvents[j].selector !== null) {
                            aNode = $(oEvents[j].selector, node);
                            sjQuery += ' (live event)';
                        } else {
                            aNode = node;
                        }

                        // for (let k = 0, kLen = aNodes.length; k < kLen; k++) {
                        if (typeof oEvents[j].origHandler !== 'undefined') {
                            func = oEvents[j].origHandler.toString();
                        } else if (typeof oEvents[j].handler !== 'undefined') {
                            func = oEvents[j].handler.toString();
                        } else {
                            func = oEvents[j].toString();
                        }
                        listeners.push({
                            func: func,
                            source: sjQuery,
                            type: type,
                        });

                        // }
                    }
                }
                if (listeners.length > 0) {
                    foundElements.push({
                        listeners: listeners,
                        node: aNode,
                    });
                }
            }
        }

        return foundElements;
    }
}
