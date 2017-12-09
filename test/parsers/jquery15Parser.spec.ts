import { expect } from 'chai';
import JQueryParser from '../../src/parsers/jqueryParser';

describe('jQuery 1.5 parsers', () => {
    it('returns the correct parser name', () => {
        const parser = new JQueryParser();
        expect(parser.name()).to.equal('jQuery');
    });
});
