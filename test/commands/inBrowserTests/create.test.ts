import { ICommandService } from '../../../src/services/interfaces/iCommandService';
import { CommandService } from '../../../src/services/commandService';
import { ICookieManager } from '../../../src/domain/cookieManager/ICookieManager';
import { CookieManager } from '../../../src/domain/cookieManager/cookieManager';
import { expect } from 'chai';

describe('Create command', () => {
    const commandService: ICommandService = CommandService.getInstance();
    const cookieManager: ICookieManager = new CookieManager();
    const clientId: string = 'TA_00000';

    afterEach(() => {
        cookieManager.removeTraversalCookie(clientId);
    });

    it('creates a new cookie', () => {
        commandService.executeCommand('create', clientId);
        const cookie = cookieManager.getTraversalCookie(clientId);
        expect(cookie).to.not.be.undefined;
        expect((cookie as any).clientId).to.equal(clientId, 'returned clientId does not match');
    });

    it('does not create cookie when an invalid clientId is passed in', () => {
        const invalidClientId = 'UNKNOWN_ID';
        commandService.executeCommand('create', invalidClientId);
        const cookie = cookieManager.getTraversalCookie(invalidClientId);
        expect(cookie).to.be.undefined;
    });
});
