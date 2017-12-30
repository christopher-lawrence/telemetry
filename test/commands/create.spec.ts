import ConsoleLogger from '../../src/domain/framework/consoleLogger';
import LogService from '../../src/services/logService';
import { ILogger } from '../../src/services/interfaces/iLogger';
import { expect } from 'chai';
import CookieMangerMock from '../mocks/cookieManagerMock';
import { JSDOM, CookieJar } from 'jsdom';

describe('Create command', () => {
    const id: string = 'TA-000000-00';
    const logger: ILogger = new ConsoleLogger();
    const cookieMangerMock = new CookieMangerMock();
    const cookieJar = new CookieJar();
    const dom = new JSDOM('', { cookieJar });

    // it('creates an instance of itself', () => {
    //     const create = new Create(id, logger, cookieMangerMock);

    //     expect(create).to.be.instanceOf(Create, 'failed to create instance of Create');
    // });

    // it.skip('skip: need to access document.cookie -- uses jsdom cookiejar', () => {
    //     window = dom.window;

    //     /** Using CookieMangerMock may or may not work... */

    //     const create = new Create(id, logger);
    //     expect(create).to.be.instanceOf(Create, 'failed to create instance of Create with jsdom');
    // });
});
