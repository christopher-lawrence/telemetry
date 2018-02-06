import { Request, Response, NextFunction } from 'express';

export interface IEventConsumerService {
    consumeEvent(req: Request, res: Response, next: NextFunction): void;
}
