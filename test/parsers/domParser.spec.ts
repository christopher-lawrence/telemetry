import { expect } from 'chai';
import { JSDOM, Options } from 'jsdom';
import DomParser from '../../src/parsers/domParser';

describe('parsers', () => {
    const domHtmlFile = "./test/html/domIndex.html";
    const jquery15HtmlFile = "./test/html/jquery15.html";
    let domDom: JSDOM;

    beforeEach(() => {
        let options: Options;
        return JSDOM.fromFile(domHtmlFile, { runScripts: "dangerously" })
            .then((jsdom) => {
                domDom = jsdom;
            });
    });

    describe('dom parser', () => {
        it('parses the test file', () => {
            const allElements = domDom.window.document.getElementsByTagName("*");
            expect(allElements.length).to.be.greaterThan(0, "allElements did not get set");
            const domParser = new DomParser();
            const result = domParser.parse(allElements);
            expect(result.length).to.be.equal(2, "parser did not return correct number of elementListeners");
        });
    });
})
