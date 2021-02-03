const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const jsdom = require('jsdom').JSDOM;
var index = 0;

exports.Geturl = function (surl, success){
    index++;
    var urlObj = url.parse(surl);
    var http = '';
    if(urlObj.protocol == 'http:'){
        http = require('http');
    }
    else if (urlObj.protocol == 'https:') {
        http = require('https');
    }
    let req = http.request({
        'hostname':urlObj.hostname,
        'path':urlObj.path,
    }, res => {
    if(res.statusCode == 200){
        var arr = [];
        var str = '';
        // console.log(res.statusCode, res.headers);
        res.on('data', buffer => {
            arr.push(buffer);
            str += buffer;
        });
        res.on('end', () => {
            var arr1 = Buffer.concat(arr);
            success && success(arr1);
        });
    }
    else if(res.statusCode == 302 || res.statusCode == 301){
        // console.log('这是第%d次重定向',index);
        console.log(`这是第${index}次重定向`);
        Geturl(res.headers.location, success);
    }
    })
    req.end();
    req.on('error', () => {
        console.log('404发现');
    })
}


//网址测试
//https://wallpaperm.cmcm.com/0c1c9e7ade8dbac90130a5c54ed43797.jpg

Geturl('https://chaoshi.detail.tmall.com/item.htm?spm=a230r.1.14.26.45f51cb2rxwjDi&id=520131742509&ns=1&abbucket=7&skuId=3100610010274', data => {
    // console.log('Yes');
    var html = gbk.toString('utf-8', data);
    fs.writeFile('test.html', html, () => {
        console.log('抓取成功');
    })
    let DOM = new jsdom(html);
    let document = DOM.window.document;
    console.log(document.querySelector('.tm-count').innerHTML);
})