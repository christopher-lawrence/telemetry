import * as express from 'express';
import { IBaseController } from '../interfaces/IBaseController';
import { IEventConsumerService } from './interfaces/IEventConsumerService';
import { EventConsumerService } from './eventConsumerService';

export class EventConsumerController implements IBaseController {
    private router: express.Router;
    private eventConsumerService: IEventConsumerService;

    constructor() {
        this.router = express.Router();
        this.eventConsumerService = new EventConsumerService();
    }

    public initialize(): express.Router {
        this.router.post('/event', (req: express.Request, res: express.Response, next: express.NextFunction) =>
            this.eventConsumerService.consumeEvent(req, res, next));
        return this.router;
    }
}
