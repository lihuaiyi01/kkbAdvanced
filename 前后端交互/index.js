const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')
const fs = require('fs')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody())

router.get('/', (ctx, next) => {
    ctx.body = 'hello'
})
router.get("/checkUserName", (ctx, next) => {
    console.log(ctx.query.username);
    let res = usersData.find(v => v.username == ctx.query.username);
    if (res) {
        ctx.body = {
            status: 1,
            info: "用户名正确"
        };
    } else {
        ctx.body = {
            status: 2,
            info: "用户名错误"
        };
    }
})
router.get('/get/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
        status: 1,
        info: '请求成功'
    }
})
router.post('/post', (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = {
        status: 1,
        info: "post请求成功"
    }
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
