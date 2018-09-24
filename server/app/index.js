/**
 * Created by zenghongtu on 01/09/2018.
 * Desc: server 入口文件
 */

import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import cors from '@koa/cors'
import routing from './routes/';
import {port, connexionString} from './config';
import init from './utils/init'

mongoose.connect(connexionString, {useNewUrlParser: true});
mongoose.connection.on('error', console.error);


// Create Koa Application
const app = new Koa();

app
    .use(cors({exposeHeaders: ['_id', '_ida']}))
    .use(logger())
    .use(bodyParser())
    .use(helmet());

routing(app);

init();

// Start the application
app.listen(port, () =>
    console.log(`✅ The server is running at http://localhost:${port}/`)
);
export default app;
