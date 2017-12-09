import { JSDOM, Options } from 'jsdom';
import { expect } from 'chai';
import ParserService from '../../src/services/parserService';
import JQueryParser from '../../src/parsers/jqueryParser';
import { parse } from 'parse5';
import { setTimeout } from 'timers';

describe('jQuery 1.5 parsers', () => {
    it('returns the correct parser name', () => {
        const parser = new JQueryParser();
        expect(parser.name()).to.equal('jQuery');
    });
});
