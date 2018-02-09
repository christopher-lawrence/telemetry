import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { EventConsumerController } from './eventConsumerService/eventConsumerController';

const app = express();

/** TODO: Winston logging
 * Winston seems like it would be a good logger
 * https://github.com/winstonjs/winston
 */
const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const date = new Date(Date.now());
    // tslint:disable-next-line:no-console
    console.log(`[${date.toString()}] ${req.originalUrl}`);
    next();
};

app.use(logger);
app.use(cors());

let port = 80;

if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-console
    console.log(`!!! NOT IN PRODUCTION MODE: ${process.env.NODE_ENV} !!!`);
    port = 3000;
    app.use('/static', express.static('dist/telemetry'));
} else {
    app.use('/static', express.static('telemetry'));
}

/** Setup routes */
const eventConsumerController = new EventConsumerController();
app.use('/telemetry', bodyParser.json(), eventConsumerController.initialize());

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Web server listening on port ${port}`));
