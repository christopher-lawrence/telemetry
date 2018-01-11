import Utilities from '../../src/common/utilities';
import { expect } from 'chai';

describe('Utilities', () => {
    it('randomNumber returns a random number inbetween min-max (6, 20)', () => {
        const min = 6, max = 20;
        const value = Utilities.randomNumber(min, max);
        expect(value).to.be.below(max, 'value exceeds max');
        expect(value).to.be.greaterThan(min, 'value is less than min');
    });

    it('randomAlphaNumericChar returns a random char', () => {
        const value = Utilities.randomAlphaNumericChar();
        expect(value).to.not.be.null;
        expect(value).to.not.be.undefined;
    });

    it('randomAlphaNumericString returns the correct string length', () => {
        const length = 10;
        const value = Utilities.randomAlphaNumericString(length);
        expect(value.length).to.be.equal(length, 'string is not the correct length');
    });
});
