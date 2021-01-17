const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const usersData = require('./data/users.json')
console.log(usersData);

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))

router.get('/', (ctx, next) => {
    ctx.body = 'hello'
})
router.get('/checkUserName', (ctx, next) => {
    console.log(ctx.query.username);
    let res = usersData.find(v => v.username == ctx.query.username)
    if (res) {
        ctx.body = {
            status: 1,
            info: '用户名正确'
        }
    } else {
        ctx.body = {
            status: 2,
            info: '用户名错误'
        }
    }
})
router.get('/get/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.body = {
        status: 1,
        info: '请求成功'
    }
})

app.use(router.routes())
app.listen(3001)
