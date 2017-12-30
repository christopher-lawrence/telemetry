import * as cookiejs from 'cookie_js';
import { ITraversal } from '../models/traversal';
import { ICookieManager } from './ICookieManager';
import { TraversalUtitlies } from '../../common/traversalUtilities';
import { ILogger } from '../../services/interfaces/iLogger';
import LogService from '../../services/logService';
const cookie = (cookiejs as any).cookie;

export class CookieManager implements ICookieManager {
    private defaultExpirationMinutes = 1;
    private logService: ILogger;

    constructor(logService?: ILogger) {
        cookie.expiresMultiplier = 60;
        cookie.defaults.expires = this.defaultExpirationMinutes;
        cookie.defaults.secure = false;
        this.logService = logService || LogService.getInstance();
    }

    /**
     * Get traversal cookie -- creates new one if one does not exist
     */
    public getTraversalCookie(clientId: string): ITraversal {
        let traversal: ITraversal = {
            clientId: '',
            id: '',
        };
        const cookies = cookie.all();
        if (!cookies || !cookies[clientId]) {
            const tId = TraversalUtitlies.newTraversalId();
            traversal = {
                clientId: clientId,
                id: tId,
            };
            this.logService.debug(`[getTraversalCookie] - Starting new traversal ${traversal.id}`);
            this.setTraversalCookie(clientId, traversal);
        } else {
            const cook = cookies[clientId];
            traversal = JSON.parse(atob(cook));
            this.logService.debug(`[getTraversalCookie] - Using previous traversal ${traversal.id}`);
        }
        return traversal;
    }

    public setTraversalCookie(clientId: string, traversal: ITraversal) {
        return cookie.set(clientId, btoa(JSON.stringify(traversal)));
    }
}
