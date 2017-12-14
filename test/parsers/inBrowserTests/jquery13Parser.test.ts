import { expect } from 'chai';
import { setTimeout } from 'timers';
import JQuery13Parser from '../../../src/parsers/jquery13Parser';

describe('jQuery 1.3 parser', () => {
    let allElements: NodeListOf<Element>;
    before(() => {
        allElements = document.getElementsByTagName('*');
    });

    /** INFO: jQuery <= 1.3
     * - Adds an unload and load -- in this order -- to the window
     */
    it('parses the test file and returns the correct number of elements with events (3)', (done) => {
        setTimeout(() => {
            const parser = new JQuery13Parser();
            const result = parser.parse(allElements);
            expect(result.length).to.be.equal(3, 'parser did not return correct number of elementListeners');
            done();
        }, 500);
    });

    it('parses the test file and returns the correct number of events (4)', (done) => {
        setTimeout(() => {
            const parser = new JQuery13Parser();
            const result = parser.parse(allElements);
            const test = result.map((r) => r.listeners.length).reduce((a, b) => a + b, 0);
            expect(test).to.be.equal(4, 'parser did not return the correct number of events');
            done();
        }, 500);
    });

    it('reports the correct version', (done) => {
        setTimeout(() => {
            const parser = new JQuery13Parser();
            const result = parser.parse(allElements);
            expect(parser.name()).to.be.equal('jQuery1.3.2', 'Incorrect version reported');
            done();
        }, 500);
    });
});
