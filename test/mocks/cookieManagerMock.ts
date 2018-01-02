import { ICookieManager } from '../../src/domain/cookieManager/ICookieManager';
import { ITraversal } from '../../src/domain/models/traversal';
import { TraversalUtitlies } from '../../src/common/traversalUtilities';

export default class CookieMangerMock implements ICookieManager {
    public netTraversalCookie(clientId: string): ITraversal {
        throw new Error('Method not implemented.');
    }
    public removeTraversalCookie(clientId: string): void {
        throw new Error('Method not implemented.');
    }
    public getTraversalCookie(clientId: string): ITraversal {
        const id = TraversalUtitlies.newTraversalId();
        return {
            clientId: clientId,
            id: id,
        };
    }

    public setTraversalCookie(id: string, traversal: ITraversal): void {
        return;
    }

}
