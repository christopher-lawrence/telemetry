import { Request, Response, NextFunction } from 'express';
import { IEventConsumerService } from './interfaces/IEventConsumerService';

export class EventConsumerService implements IEventConsumerService {
    public consumeEvent(req: Request, res: Response, next: NextFunction): void {
        /** TODO: implement further */
        // tslint:disable-next-line:no-console
        console.log(req.body);
        res.send(200);
    }
}
