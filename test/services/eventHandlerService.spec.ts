import EventHandlerService from '../../src/services/eventHandlerService';
import { expect } from 'chai';

describe('Event handler service', () => {
    it('should run', () => {
        const test = 'Hello';
        expect(test).to.equal('Hello');
    });
});
