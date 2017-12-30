import Utilities from './utilities';

export namespace TraversalUtitlies {
    const traversalIdLength: number = 10;
    const traversalIdPrefix: string = 'TA_';

    export function newTraversalId(): string {
        return traversalIdPrefix + Utilities.randomAlphaNumericString(traversalIdLength);
    }
}
