function ajax(options) {
    let opts = Object.assign({
        url: "",
        method: "get",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        async: true,
        jsonp: 'cb',
        data: {},
        dataType: '',
        success(res) { }
    }, options)

    // 处理jsonp请求
    if (opts.dataType === "jsonp") {
        jsonpFn(opts.url, opts.data, opts.jsonp, opts.success);
        return false;
    }
    function jsonpFn(url, data, cbName, cbFn) {
        // cbName   cb/callback
        let fnName = "KKB_" + Math.random().toString().substr(2);
        window[fnName] = cbFn
        let path = url + "?" + o2u(data) + "&" + cbName + "=" + fnName;
        console.log(path);
        let o = document.createElement("script");
        o.src = path;
        document.querySelector("head").appendChild(o);
    }

    let xhr = new XMLHttpRequest();
    // data = {name:zhangsan,age:20}
    // name=zhangsan&age=20;
    // get: url?  post:  send();
    if (opts.method.toLowerCase() === 'get') {
        opts.url = opts.url + "?" + o2u(opts.data);
    }
    xhr.open(opts.method, opts.url, opts.async);
    let sendData;
    // name=zhangsan&age=20; --> application/x-www-form-urlencoded
    // json --> application/json
    // console.log(o2u(opts.data));
    if (opts.headers['content-type'] === 'application/x-www-form-urlencoded') {
        sendData = o2u(opts.data);
    } else {
        sendData = JSON.stringify(opts.data);
    }

    xhr.onload = function () {
        if (opts.dataType === "json") {
            // console.log(xhr.responseText);
            opts.success(JSON.parse(xhr.responseText));
        } else {
            opts.success(xhr.responseText);
        }
    }
    xhr.send(sendData);
    function o2u(obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        // name=zhangsan
        // age=20
        return keys.map((v, k) => `${v}=${values[k]}`).join("&");
    }
}
