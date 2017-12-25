import { expect } from 'chai';
import JQueryParser from '../../src/parsers/jqueryParser';

describe('jQuery 1.6 parser', () => {
    it('retuns the correct name of the parser', () => {
        const parser = new JQueryParser();
        expect(parser.name()).to.equal('jQuery');
    });
});
