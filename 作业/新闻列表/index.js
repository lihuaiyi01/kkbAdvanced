const http = require("http");
const url = require("url");
const fs = require("fs");
const mime = require("./data/mime.json");
const path = require("path");
const data = require('./data/data.json')
// 像jQuery一样通过$操作DOM结构
const cheerio = require('cheerio')

const server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    // res.writeHead(300, { "content-type": "text/html;charset=utf-8" })
    // console.log(req.url);
    let urlObj = url.parse(req.url, true);
    // console.log(urlObj);
    // 作业：实现分页；每页5条数据
    // 接收get参数：urlObj.query
    // p=1; perPage=5; (p-1)*perPage perPage splice
    // 1."/product"    2."/product?name=zhangsan"; 查询参：querystring
    // ?p=3
    if (urlObj.pathname === "/" || urlObj.pathname === "/index") {
        // 文件读取；
        // let indexData =  fs.readFileSync("./views/index.html")
        // res.end(indexData);
        // 流方式；
        // 组装html
        // 当前页：
        let p = parseInt(urlObj.query.p) || 1
        let perPage = 5;
        let newData = JSON.parse(JSON.stringify(data)).splice((p - 1) * perPage, perPage)
        let pageCount = Math.ceil(JSON.parse(JSON.stringify(data)).length / perPage)
        let str = ''
        newData.forEach(v => {
            str += `<li class="news">
                <a href="javascript:;">
                    <img src="${v.imgUrl}" alt="">
                </a>
                <div>
                    <h3>
                        <a href="/detail?id=${v.id}">${v.title}</a>
                    </h3 >
                    <div class="info">
                        <span class="tips"><span>${v.from}</span></span>
                        <!-- <span class="line"></span> -->
                        <span class="time">| &nbsp;&nbsp;${v.newTime}</span>
                    </div>
                </div >
            </li > `
        })
        let indexData = fs.readFileSync('./views/index.html')
        let $ = cheerio.load(indexData)
        $('.news-list').html(str)
        // 组装分页html
        let pageHtml = `<a href="/index?p=${p <= 1 ? 1 : (p - 1)}" class="prev">⌜</ a> `
        for (let i = 1; i <= pageCount; i++) {
            pageHtml += `<a href = "/index?p=${i}"> ${i}</a > `
        }
        pageHtml += `<a href = "/index?p=${p <= 5 ? 5 : (p + 1)}" class="next">⌝</ a> `
        $('.pagination').html(pageHtml)
        res.end($.html())
        // let indexData = fs.createReadStream("./views/index.html");
        // indexData.pipe(res);
    } else if (urlObj.pathname === "/detail") {
        // let indexData =  fs.readFileSync("./views/product.html")
        // res.end(indexData);
        // let indexData = fs.createReadStream("./views/product.html");
        // indexData.pipe(res);
        let id = parseInt(urlObj.query.id) || 1
        let detailData = JSON.parse(JSON.stringify(data)).filter(v => v.id == id)[0]
        let indexData = fs.readFileSync('./views/detail.html')
        let $ = cheerio.load(indexData)
        let str = `<h1 class="title">${detailData.title}</h1>
            <div class="article-info"> ${detailData.from}时间：${detailData.newTime}</div>
            <p class="content">
                ${detailData.title}
            </p>`;
        $('.text').html(str)
        res.end($.html())
    } else {
        if (urlObj.pathname !== "/favicon.ico") {
            // 获取扩展名；
            let ext = path.extname(urlObj.pathname);
            // console.log("??",ext);
            res.setHeader("Content-Type", mime[ext]);
            let resData = fs.createReadStream("./views" + urlObj.pathname);
            resData.pipe(res);
        }
    }
})
server.listen(3000);
