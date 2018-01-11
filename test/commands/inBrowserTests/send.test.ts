import { MockReportingService } from '../../mocks/mockReportingService';
import * as sinon from 'sinon';
import { CommandService } from '../../../src/services/commandService';
import { CommandAgent } from '../../../src/domain/framework/commandAgent';
import { ICommandService } from '../../../src/services/interfaces/iCommandService';
import { expect } from 'chai';
import { setTimeout } from 'timers';
import EventHandlerService from '../../../src/services/eventHandlerService';

describe('Send command', () => {
    const mockReportingService = new MockReportingService();
    const clientId = 'TA_00000';
    const commandService = CommandService.getInstance();
    const eventHandlerService = EventHandlerService.getInstance();

    before(() => {
        commandService.intialize(undefined, mockReportingService);
    });

    afterEach(() => {
        mockReportingService.reset();
    });

    it('sends commands through the reporting service', (done) => {
        commandService.executeCommand('create', clientId);
        commandService.executeCommand('send', { test: 'testing...' });
        eventHandlerService.emit('contentloaded');
        setTimeout(() => {
            expect(mockReportingService.reportCalled).to.be.true;
            done();
        }, 1000);
    });

    it('calls the reporting service with correct parameters', (done) => {
        commandService.executeCommand('create', clientId);
        commandService.executeCommand('send', { test: 'testing' });
        setTimeout(() => {
            const dto = mockReportingService.reportCallParameter.getDTO();
            const customObject = dto[clientId].customObject;
            expect(customObject).to.eql({ test: 'testing' }, 'Custom object does is not deeply equal')
                .but.not.equal({ test: 'testing' }, 'Custom object "equal"');
            done();
        }, 1000);
    });
});
