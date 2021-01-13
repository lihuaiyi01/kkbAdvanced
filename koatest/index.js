const Koa = require('koa')
const app = new Koa()
app.use((ctx, next) => {
    // ctx-->context 上游或者下游的对象
    ctx.body = '你好'
})
app.listen(3000)
