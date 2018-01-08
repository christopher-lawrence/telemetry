import EventHandlerService from '../../src/services/eventHandlerService';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import DomParser from '../../src/parsers/domParser';
import * as sinon from 'sinon';

describe('Event handler service', () => {
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
        const eventHandlerService = EventHandlerService.getInstance();

        const mockEventHandler = sinon.spy();
        const result = domParser.parse(allElements);
        result.map((r) => eventHandlerService.addTelemetryListener(r, mockEventHandler));
        const element = result[0];
        simulateClick(element.node);
        expect(mockEventHandler.called).to.be.true;
    });
});
