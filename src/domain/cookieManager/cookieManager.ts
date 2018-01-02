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
    public getTraversalCookie(clientId: string): ITraversal | undefined {
        const cookies = cookie.all();
        if (cookies && cookies[clientId]) {
            const cook = cookies[clientId];
            const traversal = JSON.parse(atob(cook));
            this.logService.debug(`[getTraversalCookie] - Using previous traversal ${traversal.id}`);
            return traversal;
        }
        return undefined;
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
}
