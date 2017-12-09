import { expect } from 'chai';
import JQueryParser from '../../../src/parsers/jqueryParser';
import { setTimeout } from 'timers';

describe('jQuery 1.4 parser', () => {
    let allElements: NodeListOf<Element>;
    before(() => {
        allElements = document.getElementsByTagName('*');
    });

    it('parses the test file and returns the correct number of events found', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(result.length).to.be.equal(2, 'parser did not return correct number of elementListeners');
            done();
        }, 500);
    });

    it('reports the correct version', (done) => {
        setTimeout(() => {
            const parser = new JQueryParser();
            const result = parser.parse(allElements);
            expect(parser.name()).to.be.equal('jQuery1.4.4', 'Incorrect version reported');
            done();
        }, 500);
    });
});
