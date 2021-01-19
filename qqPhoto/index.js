const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody({
    multipart: true
}))

router.get('/test', ctx => {
    ctx.body = 'hello'
})

app.use(router.routes())
app.listen(8787)
