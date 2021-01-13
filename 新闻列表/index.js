<<<<<<< HEAD
const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('./data/mime.json')
const path = require('path')
const data = require('./data/data.json')
const cheerio = require('cheerio')
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    // res.writeHead(300, { 'content-type': 'text/html;charset=utf-8' })
    console.log(req.url);
    let urlObj = url.parse(req.url)
    console.log(urlObj);
    // 1.'/product'   2.'/product?name=zhangsan'    查询参：querystring
    if (urlObj.pathname === '/' || urlObj.pathname === '/index') {
        // 文件读取
        // let indexData = fs.readFileSync('./view/index.html')
        // res.end(indexData)
        // 流方式
        // 组装html
        let str = ''
        data.forEach(v => {
            str += `<li class="news">
            <a href="javascript:;">
                <img src="${v.imgUrl}" alt="">
            </a>
            <div>
                <h3>
                    <a href="javascript:;">${v.title}</a>
                </h3>
                <div class="info">
                    <span class="tips"><span>${v.from}</span></span>
                    <!-- <span class="line"></span> -->
                    <span class="time">| &nbsp;&nbsp;${v.newTime}</span>
                </div>
            </div>
        </li>`
        })

        let indexData = fs.readFileSync('./views/index.html')
        let $ = cheerio.load(indexData)
        $('.news-list').html(str)
        // let indexData = fs.createReadStream('./views/index.html')
        // indexData.pipe(res)
        res.end($.html())
    } else if (urlObj.pathname === '/product') {
        // let indexData = fs.readFileSync('./view/product.html')
        // res.end(indexData)
        let indexData = fs.createReadStream('./views/detail.html')
        indexData.pipe(res)
    } else {
        if (urlObj.pathname !== '/favicon.ico') {
            // 获取扩展名
            let ext = path.extname(urlObj.pathname)
            res.setHeader('Content-Type', mime[ext])
            let resData = fs.createReadStream('./views/css' + urlObj.pathname)
            resData.pipe(res)
        }
    }
})

server.listen(3000)
=======
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
>>>>>>> 05_2_node
