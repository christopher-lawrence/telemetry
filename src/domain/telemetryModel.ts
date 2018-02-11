import { ICookieManager } from './cookieManager/ICookieManager';
import { CookieManager } from './cookieManager/cookieManager';
import { ITraversalCookie } from './models/traversalCookie';

/**
 * All object being sent to /telemetry/event should be wrapped in this object...DTO
 */
export class TelemetryModel {
    /** TODO: PageStats */
    private page: string;
    private customObject: any;
    private cookieManager: ICookieManager;

    constructor(customObject: any) {
        this.customObject = customObject;
        this.page = window.location.href;
        this.cookieManager = new CookieManager();
    }

    public getDTO() {
        const traversalCookie = this.cookieManager.getTraversalCookie();
        const traversalInitCookie = this.cookieManager.getTraversalInitCookie();
        const dto: any = {};
        if (traversalCookie) {
            dto[traversalCookie.clientId] = {
                customObject: this.customObject,
                lastVisit: traversalInitCookie.lastVisit,
                page: this.page,
                traversalId: traversalCookie.id,
                userId: traversalInitCookie.userId,
            };
        }
        return dto;
    }
}
