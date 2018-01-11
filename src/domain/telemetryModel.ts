import { ICookieManager } from './cookieManager/ICookieManager';
import { CookieManager } from './cookieManager/cookieManager';
import { ITraversal } from './models/traversal';

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
        const clientId = this.cookieManager.getTraversalCookie();
        const dto: any = {};
        if (clientId) {
            const traversal = clientId as ITraversal;
            dto[traversal.clientId] = {
                customObject: this.customObject,
                page: this.page,
            };
        }
        return dto;
    }
}
