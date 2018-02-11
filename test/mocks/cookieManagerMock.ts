import { ICookieManager } from '../../src/domain/cookieManager/ICookieManager';
import { ITraversalCookie } from '../../src/domain/models/traversalCookie';
import { TraversalUtitlies } from '../../src/common/traversalUtilities';
import { IInitialCookie } from '../../src/domain/models/IInitialCookie';

export default class CookieMangerMock implements ICookieManager {
    public getTraversalInitCookie(): IInitialCookie {
        throw new Error('Method not implemented.');
    }
    public setTraversalInitCookie(): void {
        throw new Error('Method not implemented.');
    }
    public netTraversalCookie(clientId: string): ITraversalCookie {
        throw new Error('Method not implemented.');
    }
    public removeTraversalCookie(clientId: string): void {
        throw new Error('Method not implemented.');
    }
    public getTraversalCookie(clientId: string): ITraversalCookie {
        const id = TraversalUtitlies.newTraversalId();
        return {
            clientId: clientId,
            id: id,
        };
    }

    public setTraversalCookie(id: string, traversal: ITraversalCookie): void {
        return;
    }

}
