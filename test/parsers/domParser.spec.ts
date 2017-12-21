import { expect } from 'chai';
import { JSDOM, Options } from 'jsdom';
import DomParser from '../../src/parsers/domParser';
import { setTimeout } from 'timers';

describe('dom parser', () => {
    const domHtmlFile = './test/html/domIndex.html';
    const jquery15HtmlFile = './test/html/jquery15.html';
    let domDom: JSDOM;
    let allElements: NodeListOf<Element>;

    before(() => {
        return JSDOM.fromFile(domHtmlFile, { runScripts: 'dangerously' })
            .then((jsdom) => {
                domDom = jsdom;
                allElements = domDom.window.document.getElementsByTagName('*');
            });
    });

    it('parses the test file and returns the correct number of elements', () => {
        expect(allElements.length).to.be.greaterThan(0, 'allElements did not get set');
        const domParser = new DomParser();
        const result = domParser.parse(allElements);
        expect(result.length).to.be.equal(2, 'parser did not return correct number of elementListeners');
    });

    it.skip('skipped due to bug #16 - parses the test file and returns the correct number of events', (done) => {
        setTimeout(() => {
            const domParser = new DomParser();
            const result = domParser.parse(allElements);
            const expected = result.map((r) => r.listeners.length).reduce((a, b) => a + b, 0);
            expect(expected).to.be.equal(4, 'parser did not return correct number of event handlers');
            done();
        }, 500);
    });

    it('returns the correct name of the parser', () => {
        const domParser = new DomParser();
        expect(domParser.name()).to.equal('DOM');
    });
});
