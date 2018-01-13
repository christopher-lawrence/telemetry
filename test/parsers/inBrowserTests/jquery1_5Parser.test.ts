import { expect } from 'chai';
import JQueryParser from '../../../src/parsers/jqueryParser';
import { setTimeout } from 'timers';

describe('jQuery 1.5 parser', () => {
    let allElements: NodeListOf<Element>;
    before(() => {
        allElements = document.getElementsByTagName('*');
    });

    it('parses the test file and returns the correct number of events found(6)', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(result.length).to.be.equal(6, 'parser did not return correct number of elementListeners');
            done();
        }, 500);
    });

    it('parses the test file and returns the correct number of events (7)', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            const test = result.map((r) => r.listeners.length).reduce((a, b) => a + b, 0);
            expect(test).to.be.equal(7, 'parser did not return the correct number of events');
            done();
        }, 500);
    });

    it(`reports the correct version (${$.fn.jquery})`, (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(parser.name()).to.be.equal('jQuery 1.5.2', 'Incorrect version reported');
            done();
        }, 500);
    });
});
