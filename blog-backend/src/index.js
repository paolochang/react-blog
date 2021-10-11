require('dotenv').config();
const fs = require('fs');
import Koa from 'koa';
import morgan from 'koa-morgan';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
// import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/../access.log', {
  flags: 'a',
});

const app = new Koa();
const router = new Router();

// router 적용 전에 bodyParser 적용
app.use(bodyParser());
// setup the logger
app.use(morgan('common', { stream: accessLogStream }));

// router 설정
router.use('/api', api.routes());
// app instance에 router 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
