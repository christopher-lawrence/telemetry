import * as Cookies from 'js-cookie';
import { ITraversalCookie } from '../models/traversalCookie';
import { ICookieManager } from './ICookieManager';
import { TraversalUtitlies } from '../../common/traversalUtilities';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
import * as uuid from 'uuid/v4';
import { IInitialCookie } from '../models/IInitialCookie';

export class CookieManager implements ICookieManager {
    private defaultExpirationMinutes = 30;
    private logService: ILogger;
    private readonly initialCookie: string = 'TA_init';

    constructor(logService?: ILogger) {
        this.logService = logService || LogService.getInstance();
    }

    public setTraversalInitCookie(): void {
        const initialCookie = Cookies.get(this.initialCookie);
        /** Old */
        if (initialCookie) {
            this.setCookie(this.initialCookie, this.updateInitialCookieTimestamp(initialCookie), { expires: 365 });
        } else {
            /** New */
            const cookE = JSON.stringify({
                lastVisit: new Date(Date.now()).toUTCString(),
                userId: uuid(),
            });
            this.setCookie(this.initialCookie, cookE, { expires: 365 });
        }
    }

    public getTraversalInitCookie(): IInitialCookie {
        return this.parseCookie(Cookies.get(this.initialCookie)) as IInitialCookie;
    }

    /**
     * Get traversal cookie -- if a client id is not passed in we need to find the cookie!!!
     */
    public getTraversalCookie(clientId?: string): ITraversalCookie | undefined {
        let traversal;
        const cookies = Cookies.get();
        const id = clientId || '';
        let cookE;
        if (cookies) {
            if (cookies[id]) {
                cookE = cookies[id];
            } else {
                cookE = this.findTraversalCookie(cookies);
            }
            if (cookE) {
                traversal = this.parseCookie(cookE);
                this.logService.debug(`[getTraversalCookie] - Using previous traversal ${traversal.id}`);
            }
        }
        return traversal;
    }

    /**
     * Get or create a new traversal cookie
     * @param clientId client id to query for
     */
    public netTraversalCookie(clientId: string): ITraversalCookie {
        let traversal = this.getTraversalCookie(clientId);

        if (!traversal) {
            const tId = TraversalUtitlies.newTraversalId();
            traversal = {
                clientId: clientId,
                id: tId,
            };
            this.setTraversalCookie(clientId, traversal);
        }
        return traversal;
    }

    public setTraversalCookie(clientId: string, traversal: ITraversalCookie) {
        const previousCookie = this.getTraversalCookie(clientId);
        if (previousCookie) {
            return previousCookie;
        }
        this.logService.debug(`[setTraversalCookie] - Starting new traversal ${traversal.id}`);
        return this.setCookie(clientId, JSON.stringify(traversal));
    }

    public removeTraversalCookie(clientId: string): void {
        Cookies.remove(clientId);
    }

    private updateInitialCookieTimestamp(cookE: string): string {
        const c = this.parseCookie(cookE) as IInitialCookie;
        c.lastVisit = new Date(Date.now()).toUTCString();
        return JSON.stringify(c);
    }

    private setCookie(key: string, value: string, attributes?: Cookies.CookieAttributes) {
        return Cookies.set(key, btoa(value), attributes);
    }

    private parseCookie(cookE: any) {
        return JSON.parse(atob(cookE));
    }

    private findTraversalCookie(cookies: any): string {
        const props = Object.getOwnPropertyNames(cookies);
        let found;
        for (const prop in props) {
            if (props[prop].startsWith('TID_')) {
                found = cookies[props[prop]];
            }
        }
        return found;
    }
}
