import { ICookieManager } from '../cookieManager/ICookieManager';
import { CookieManager } from '../cookieManager/cookieManager';
import { ITraversalCookie } from './traversalCookie';

/**
 * All object being sent to /telemetry/event should be wrapped in this object...DTO
 */
export class TelemetryModel {
    private customObject: any;
    private cookieManager: ICookieManager;

    constructor(customObject: any) {
        this.customObject = customObject;
        this.cookieManager = new CookieManager();
    }

    public getDTO() {
        const traversalCookie = this.cookieManager.getTraversalCookie();
        const traversalInitCookie = this.cookieManager.getTraversalInitCookie();
        const dto: any = {};
        if (traversalCookie) {
            dto[traversalCookie.clientId] = {
                client: this.getClientInformationDto(),
                customObject: this.customObject,
                data: this.getDataStorageDto(),
                device: this.getDeviceInformationDto(),
                lastVisit: traversalInitCookie.lastVisit,
                pageInfo: this.getPageInformationDto(),
                traversalId: traversalCookie.id,
                userId: traversalInitCookie.userId,
            };
        }
        return dto;
    }

    private getClientInformationDto() {
        return {
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            language: navigator.language,
            platform: navigator.platform,
            product: navigator.product,
            productSub: navigator.productSub,
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
        };
    }

    private getPageInformationDto() {
        return {
            host: window.location.host,
            page: window.location.pathname,
            pageHref: window.location.href,
            referrer: document.referrer,
            referrerType: this.getReferrerType(),
            sizeInnerH: window.innerHeight,
            sizeInnerW: window.innerWidth,
            timeOpened: new Date().toUTCString(),
        };
    }

    private getDataStorageDto() {
        return {
            cookiesDecoded: decodeURIComponent(document.cookie),
            cookiesRaw: document.cookie,
            storage: localStorage,
        };
    }

    private getDeviceInformationDto() {
        return {
            sizeScreenH: screen.height,
            sizeScreenW: screen.width,
        };
    }

    private readonly socialMediaSites: string[] = [
        'twitter',
        'facebook',
        'instagram',
        'linkedin',
        'pinterest',
        'flickr',
        'tumblr',
        'youtube',
        'reddit',
        'myspace',
        'vine',
    ];

    private readonly webSearchSites: string[] = [
        'google',
        'yahoo',
        'bing',
        'dogpile',
        'duckduckgo',
        'altavista',
        'excite',
        'lycos',
        'ask',
    ];

    /**
     * Social media, web search
     */
    private getReferrerType(): string {
        const referrer = this.getReferrer();
        if (referrer === '') {
            return 'NONE';
        } else if (this.isSocialMediareferrer(referrer)) {
            return 'SOCIAL';
        } else if (this.isSearchEngineReferrer(referrer)) {
            return 'SEARCH';
        }
        return 'OTHER';
    }

    private isSocialMediareferrer(referrer: string): boolean {
        return this.socialMediaSites.find((s) => referrer.indexOf(s) > -1) !== null;
    }

    private isSearchEngineReferrer(referrer: string): boolean {
        return this.webSearchSites.find((s) => referrer.indexOf(s) > -1) !== null;
    }

    private getReferrer(): string {
        if (document.referrer === '') {
            return document.referrer;
        }
        return (document.referrer.match(/[-\w.]+(?=\.\w)/) as RegExpMatchArray)[0];
    }
}
