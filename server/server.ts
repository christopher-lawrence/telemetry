import * as express from 'express';

const app = express();

/** TODO: Winston logging
 * Winston seems like it would be a good logger
 * https://github.com/winstonjs/winston
 */
const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // tslint:disable-next-line:no-console
    console.log(req.originalUrl);
    next();
};

app.use(logger);
// tslint:disable-next-line:no-console
console.log(process.env.NODE_ENV);

let port = 80;

if (process.env.NODE_ENV !== 'production') {
    port = 3000;
    app.use('/static', express.static('dist/telemetry'));
} else {
    app.use('/static', express.static('telemetry'));
}

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Web server listening on port ${port}`));
