// 同源： 协议 域名 端口 相同
const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody())

router.get('/test', (ctx, next) => {
    ctx.body = 'hello'
})
router.post('/post', ctx => {
    console.log('有请求发送过来', ctx.request.body);
    ctx.body = 'hello'
})

app.use(router.routes())
app.listen(8989)
