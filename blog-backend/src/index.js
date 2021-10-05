const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// router 설정
router.use('/api', api.routes());

// router 적용 전에 bodyParser 적용
app.use(bodyParser());

// app instance에 router 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
