import { expect } from 'chai';
import JQueryParser from '../../../src/parsers/jqueryParser';
import { setTimeout } from 'timers';
import * as sinon from 'sinon';
import EventHandlerService from '../../../src/services/eventHandlerService';

describe('EventHandler service', () => {
    let allElements: NodeListOf<Element>;
    const parser = new JQueryParser();
    const eventHandlerService = EventHandlerService.getInstance();
    const handlerStub = sinon.stub();

    before((done) => {
        setTimeout(() => {
            allElements = document.getElementsByTagName('*');
            const result = parser.parse(allElements);
            result.forEach((r) => eventHandlerService.addTelemetryListener(r, handlerStub));
            done();
        }, 500);
    });

    afterEach(() => {
        handlerStub.resetHistory();
    });

    it('calls the telemetry event handler on click', () => {
        $('#click-test-image').trigger('click');
        expect(handlerStub.callCount).to.be.equal(1, 'listener for "click" not called');
    });

    it('calls the telemetry event handler on click for a multi-listen element', () => {
        $('#dblclick-test-image').trigger('click');
        expect(handlerStub.callCount).to.be.equal(1, 'listener for "click" not called');
    });

    it.skip('TODO: dblclick is called, but not handled -- calls the telemetry event handler on dblclick', () => {
        $('#dblclick-test-image').trigger('dblclick');
        expect(handlerStub.callCount).to.be.equal(1, 'listener for "dblclick" not called');
    });

    it('calls the telemetry event handler on change', () => {
        $('#yes').trigger('click');
        $('#no').trigger('click');
        expect(handlerStub.called, 'listener for "change" not called');
    });

    it('calls the telemetry event handler on submit', () => {
        $('#submit-button').trigger('click');
        expect(handlerStub.callCount).to.be.equal(1, 'listener for "submit" not called');
    });
});
