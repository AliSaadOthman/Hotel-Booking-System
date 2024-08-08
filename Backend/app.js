import debug from 'debug';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes/index.js';
import users from './routes/users.js';

const app = express();
const dbg = debug('my express app');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    dbg(`Express server listening on port ${server.address().port}`);
});
