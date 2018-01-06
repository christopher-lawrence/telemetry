import { ITraversal } from '../models/traversal';

export interface ICookieManager {
    getTraversalCookie(clientId?: string): ITraversal | undefined;
    setTraversalCookie(clientId: string, traversal: ITraversal): void;
    netTraversalCookie(clientId: string): ITraversal;
    removeTraversalCookie(clientId: string): void;
}
