const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");
let app = new Koa();
let router = new Router();
app.use(static(__dirname + "/static"));
app.use(koaBody({
    multipart: true
}))

router.get('/text', ctx => {
    ctx.body = "hello"
})
router.post("/upload", ctx => {
    ctx.body = "something...";
})

app.use(router.routes());
app.listen(8686);
