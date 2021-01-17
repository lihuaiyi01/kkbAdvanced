const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");

router.get("/", ctx => {
    ctx.body = "some value...";
})
router.post("/post", ctx => {
    // console.log(111);
    console.log(ctx.request.body);
    ctx.body = "some value...";
})
router.post("/xml", ctx => {
    // console.log(111);
    // console.log(ctx.request.body);
    // ctx.set("content-type","text/xml");
    ctx.body = `<?xml version='1.0' encoding='utf-8'?>
                <books>
                    <nodejs>nodejs从入门到实战</nodejs>
                    <nodejs>vue从入门到精通</nodejs>
                </books>
            `;
})
