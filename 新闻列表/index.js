const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const static = require("koa-static");
let app = new Koa();
let router = new Router();
app.use(views(__dirname + "/views"), {
    extension: "pug"
});
// /static --->locahost:8888
app.use(static(__dirname + "/static"));
router.get("/", ctx => {
    ctx.redirect("/index");
});
router.get("/index", ctx => {
    // ctx.redirect("/index");
    ctx.body = "主页";
});
router.get("/detail", ctx => {
    // ctx.redirect("/index");
    ctx.body = "详细页面"
});
app.use(router.routes());
app.listen(4000);
//作业 ：通过koa实现 新闻列表 分页、详细页面；
