import { JSDOM, Options } from 'jsdom';
import { expect } from 'chai';
import JQueryParser from '../../../src/parsers/jqueryParser';
import { setTimeout } from 'timers';

describe('jQuery 1.6 parser', () => {
    it('parses the test file and returns the correct number of events found', () => {
        setTimeout(() => {
            const allElements = document.getElementsByTagName('*');
            expect(allElements.length).to.be.gt(0, 'allElements did not get set');
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(result.length).to.be.eq(2, 'parser did not return correct number of elementListeners');
        }, 500);
    });
});
