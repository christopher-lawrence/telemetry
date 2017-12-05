import { IParser } from "./interfaces/iParser";
import { IElementListener } from "../common/interfaces/ielementListener";
import { listenerCount } from "cluster";
import { IListener } from "../common/interfaces/ilistener";
import Utilities from "../common/utilities";

export default class JQueryParser implements IParser {
    public readonly name: string = "jQuery";

    parse(elements: NodeListOf<Element>): IElementListener[] {
        /** jQuery 1.5 and 1.6 use a cache for all event data. The elements are not needed */
        const result: IElementListener[] = [];
        result.push(...this.getJQueryFiveSix());

        return result;
    }

    private getJQueryFiveSix(): IElementListener[] {
        // if (!window.hasOwnProperty("jQuery")) {
        //     return []
        // }
        if (!jQuery ||
            Utilities.versionCompare(jQuery.fn.jquery, '<', '1.5') ||
            Utilities.versionCompare(jQuery.fn.jquery, '>=', '1.7')) {
            return [];
        }
        const result: IElementListener[] = [];
        for (let j in (jQuery as any).cache) {
            result.push(...this.handleJQuery((jQuery as any).cache[j]));
        }
        return result;
    }

    private handleJQuery(cache: any): IElementListener[] {
        cache.forEach((key: any, val: any) => {
            if (val.handle) {
                return this.getNodeEvents(val, val.handle.elem);
            }
        });

        return [];
    }

    private getNodeEvents(eventsObject: any, node: Node): IElementListener[] {
        if (typeof eventsObject != 'object') {
            return [];
        }
        let events;
        if (typeof eventsObject.events == 'object') {
            events = eventsObject.events;
        }

        if (!events) {
            events = $.data(eventsObject, 'events');
        }

        let func;

        const foundElements: IElementListener[] = [];
        const anyFoundElements: any[] = [];
        for (let type in events) {
            if (events.hasOwnProperty(type)) {
                if (type == 'live') {
                    continue;
                }

                var oEvents = events[type];

                for (var j in oEvents) {
                    if (oEvents.hasOwnProperty(j)) {
                        let aNodes = [];
                        let sjQuery = "jQuery" + jQuery.fn.jquery;

                        if (typeof oEvents[j].selector != 'undefined' && oEvents[j].selector !== null) {
                            aNodes.push($(oEvents[j].selector, node));
                            sjQuery += " (live event)";
                        } else {
                            aNodes.push(node);
                        }

                        const anyListeners: any[] = [];
                        for (let k = 0, kLen = aNodes.length; k < kLen; k++) {
                            // const element: IElementListener = {
                            //     node: aNodes[k],
                            //     listeners: []
                            // };

                            if (typeof oEvents[j].origHandler != 'undefined') {
                                func = oEvents[j].origHandler.toString();
                            } else if (typeof oEvents[j].handler != 'undefined') {
                                func = oEvents[j].handler.toString();
                            } else {
                                func = oEvents[j].toString();
                            }
                            anyFoundElements.push({
                                "node": aNodes[k],
                                "listeners": [{
                                    "type": type,
                                    "func": func,
                                    "removed": false,
                                    "source": sjQuery
                                }]
                            });

                        }
                    }
                }
            }
        }

        return anyFoundElements;
    }
}
