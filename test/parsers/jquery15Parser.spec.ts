import { JSDOM, Options } from "jsdom";
import { expect } from "chai";
import ParserService from "../../src/services/parserService";
import JQueryParser from "../../src/parsers/jqueryParser";
import { parse } from "parse5";

describe("jQuery 1.5 parsers", () => {
    // const domHtmlFile = "./test/html/domIndex.html";
    // const jquery15HtmlFile = "./test/html/jquery15.html";
    // let jquery15Dom: JSDOM;

    // beforeEach(() => {
    //     let options: Options;
    //     return JSDOM.fromFile(domHtmlFile, { runScripts: "dangerously" })
    //         .then((jsdom) => {
    //             domDom = jsdom;
    //         }).then(() => {
    //             return JSDOM.fromFile(jquery15HtmlFile, { resources: 'usable', runScripts: "dangerously" })
    //         }).then((jqueryDom: JSDOM) => {
    //             (global as any).jQuery = jQuery;
    //             jquery15Dom = jqueryDom;
    //         });
    // });
    it.skip('Skipping until issue #6 is resolved -- parses the test file and returns the correct number of events found', () => {
        const allElements = document.getElementsByTagName("*");
        expect(allElements.length).to.be.gt(0, "allElements did not get set");
        const parser = new JQueryParser();
        const result = parser.parse(allElements);
        expect(result.length).to.be.eq(2, "parser did not return correct number of elementListeners");
    });

    it('returns the correct parser name', () => {
        const parser = new JQueryParser();
        expect(parser.name()).to.equal('jQuery');
    })
})