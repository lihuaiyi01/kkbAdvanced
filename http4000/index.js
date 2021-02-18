const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");

let app = new Koa();
app.use(static(__dirname + "/static"));
let router = new Router();

router.get("/", ctx => {
    ctx.body = "some value...";
})

app.use(router.routes());
app.listen(4000);
