import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import ParserService from '../../src/services/parserService';

describe('parserService', () => {
    const domHtmlFile = "./test/html/domIndex.html";
    let domDom: JSDOM;

    beforeEach(() => {
        return JSDOM.fromFile(domHtmlFile, { runScripts: "dangerously" })
            .then((jsdom) => {
                domDom = jsdom;
            });
    });

    describe('dom parser', () => {
        it('parses the test file', () => {
            const allElements = domDom.window.document.getElementsByTagName("*");
            expect(allElements.length).to.be.greaterThan(0, "allElements did not get set");
            const parserService = new ParserService(allElements);
            const result = parserService.executeParsers();
            expect(result.length).to.be.equal(2, "parser did not return correct number of elementListeners");
        });
    });
})
