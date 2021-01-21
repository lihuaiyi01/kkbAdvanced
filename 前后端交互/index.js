const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')
const fs = require('fs')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody({
    multipart: true
}))

router.get('/', (ctx, next) => {
    ctx.body = 'hello'
})
router.post("/upload", (ctx, next) => {
    // console.log(ctx.request.body);
    // console.log(ctx.request.files.img);
    let fileData = fs.readFileSync(ctx.request.files.img.path);
    fs.writeFileSync("static/imgs/" + ctx.request.files.img.name, fileData);
    ctx.body = "请求成功";
})

app.use(router.routes())
app.listen(3000)
