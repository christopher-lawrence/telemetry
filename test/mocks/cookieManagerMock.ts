import { ICookieManager } from '../../src/domain/cookieManager/ICookieManager';
import { ITraversal } from '../../src/domain/models/traversal';
import { TraversalUtitlies } from '../../src/common/traversalUtilities';

export default class CookieMangerMock implements ICookieManager {
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
