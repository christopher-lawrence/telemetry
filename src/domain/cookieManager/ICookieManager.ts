import { ITraversalCookie } from '../models/traversalCookie';
import { IInitialCookie } from '../models/IInitialCookie';

export interface ICookieManager {
    getTraversalCookie(clientId?: string): ITraversalCookie | undefined;
    setTraversalCookie(clientId: string, traversal: ITraversalCookie): void;
    netTraversalCookie(clientId: string): ITraversalCookie;
    removeTraversalCookie(clientId: string): void;
    getTraversalInitCookie(): IInitialCookie;
    setTraversalInitCookie(): void;
}
