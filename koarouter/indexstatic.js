const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const static = require('koa-static')
let app = new Koa()
let router = new Router()
app.use(views(__dirname + '/views'), {
    extension: 'pug'
})
// /static ---> locahost:8888
app.use(static(__dirname + '/static'))
router.get('/', async (ctx, next) => {
    ctx.redirect('/index')
})
router.get('/index', async (ctx, next) => {
    // ctx.body = '新闻页面'
    await ctx.render('index.pug')
})
router.get('/detail', async (ctx, next) => {
    ctx.body = '详情页面'
})
// get:地址栏 script src='' img src href=''
router.all('/getData/:id', async (ctx, next) => {
    ctx.body = {
        name: 张三,
        age: 20
    }
})
// get：获取数据 post:添加 put：更新 delete：删除
// 以前接口
// 添加 http://localhost/addUser?id=1
// 删除 http://localhost/delUser
// RESTful 架构设计接口
// 添加：http://localhost/user  (post)
// 查询：http://localhost/user  (get)

app.use(router.routes())
app.listen(8888)
