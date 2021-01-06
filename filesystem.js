const fs = require('fs');   // 文件操作
// 增删改查 crod
// 1. 文件操作
// 2. 目录操作

// 1. 文件操作
// fs.writeFile('1.txt', '我是写入的文字', function (err) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('写入成功');
// })
// a: 追加写入；w：写入；r：读取；
// fs.writeFile('1.txt', '我是追加的文字', { flag: 'a' }, function (err) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('写入成功');
// })

// 文件读取
// fs.readFile('1.txt', 'utf8', (err, data) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data.toString());
// })

// 所有文件操作 没有加Sync都是异步，否则都是同步
// let data = fs.readFileSync('1.txt');
// console.log(data.toString());

// 修改：（修改名称）；
// fs.rename('1.txt', '2.txt', err => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('修改成功');
// })

// 删除:
// fs.unlink('2.txt', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('删除成功');
// })

// 复制，先读取 再写入 的过程
// fs.copyFile('index.html', 'myindex.html', err => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('复制成功');
// })

// 复制
// function myCopy(src, dest) {
//     fs.writeFileSync(dest, fs.readFileSync(src));
// }
// myCopy('index.html', 'test.html')

// 目录操作
