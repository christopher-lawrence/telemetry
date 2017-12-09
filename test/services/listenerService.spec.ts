import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import ParserService from '../../src/services/parserService';
import ListenerService from '../../src/services/listenerService';
import EventHandlerService from '../../src/services/eventHandlerService';
import { Event } from '_debugger';
import * as sinon from 'sinon';
import DomParser from '../../src/parsers/domParser';

describe('listenerService', () => {
    const testHtmlFile = './test/html/domIndex.html';
    let dom: JSDOM;

    const simulateClick = (element: Element) => {
        const event = dom.window.document.createEvent('HTMLEvents');
        event.initEvent('click', false, true);
        element.dispatchEvent(event);
    };

    beforeEach(() => {
        return JSDOM.fromFile(testHtmlFile, { runScripts: 'dangerously' })
            .then((jsdom) => {
                dom = jsdom;
            });
    });

    it('adds the default event handler', () => {
        const allElements = dom.window.document.getElementsByTagName('*');
        const domParser = new DomParser();
        const listenerService = new ListenerService();

        const mockEventHandler = sinon.spy();
        const result = domParser.parse(allElements);
        result.map((r) => listenerService.AddListeners(r, mockEventHandler));
        const element = result[0];
        simulateClick(element.node);
        expect(mockEventHandler.called).to.be.true;
    });
});
