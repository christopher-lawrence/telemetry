import { ITraversal } from '../models/traversal';

export interface ICookieManager {
    getTraversalCookie(clientId: string): ITraversal;
    setTraversalCookie(clientId: string, traversal: ITraversal): void;
}
