console.log('a文件...');
// let a = 10;
define(['b'], function (obj) {
    console.log('b的对象', obj);
    // let a = 10;
    return {
        name: '张三',
        age: 20
    }
})
