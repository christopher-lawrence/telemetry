import { expect } from 'chai';
import JQueryParser from '../../../src/parsers/jqueryParser';
import { setTimeout } from 'timers';

describe('jQuery 1.7 parser', () => {
    let allElements: NodeListOf<Element>;
    before(() => {
        allElements = document.getElementsByTagName('*');
    });

    it('parses the test file and returns the correct number of events found', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(result.length).to.be.eq(2, 'parser did not return correct number of elementListeners');
            done();
        }, 500);
    });

    it('reports the correct version', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(parser.name()).to.equal('jQuery1.7.2', 'Incorrect version reported');
            done();
        }, 500);
    });
});
