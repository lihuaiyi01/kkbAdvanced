const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
router.get('/', (ctx, next) => {
    ctx.body = 'hello'
})
router.get('/getAjax', (ctx, next) => {
    ctx.body = {
        name: '李四4000',
        age: 20
    }
})

app.use(router.routes())
app.listen(4000)
