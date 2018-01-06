import * as cookiejs from 'cookie_js';
import { ITraversal } from '../models/traversal';
import { ICookieManager } from './ICookieManager';
import { TraversalUtitlies } from '../../common/traversalUtilities';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
const cookie = (cookiejs as any).cookie;

export class CookieManager implements ICookieManager {
    private defaultExpirationMinutes = 30;
    private logService: ILogger;

    constructor(logService?: ILogger) {
        cookie.expiresMultiplier = 60;
        cookie.defaults.expires = this.defaultExpirationMinutes;
        cookie.defaults.secure = false;
        this.logService = logService || LogService.getInstance();
    }

    /**
     * Get traversal cookie
     */
    public getTraversalCookie(clientId?: string): ITraversal | undefined {
        const cookies = cookie.all();
        const id = clientId || '';
        let cookE;
        let traversal;
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
    public netTraversalCookie(clientId: string): ITraversal {
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

    public setTraversalCookie(clientId: string, traversal: ITraversal) {
        const previousCookie = this.getTraversalCookie(clientId);
        if (previousCookie) {
            return previousCookie;
        }
        this.logService.debug(`[setTraversalCookie] - Starting new traversal ${traversal.id}`);
        return cookie.set(clientId, btoa(JSON.stringify(traversal)));
    }

    public removeTraversalCookie(clientId: string): void {
        cookie.remove(clientId);
    }

    private parseCookie(cookE: any) {
        return JSON.parse(atob(cookE));
    }

    private findTraversalCookie(cookies: any): string {
        const props = Object.getOwnPropertyNames(cookies);
        let found;
        for (const prop in props) {
            if (prop.startsWith('TA_')) {
                found = cookies[prop];
            }
        }
        return found;
    }
}
