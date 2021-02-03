const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const jsdom = require('jsdom').JSDOM;
const segment = require('segment');
var index = 0;

exports.Geturl = function (surl, success){
    index++;
    var UrlObj = url.parse(surl);
    var http = '';
    // console.log(UrlObj);
    if (UrlObj.protocol == 'https:') {
        http = require('https');
    }
    else if (UrlObj.protocol == 'http:') {
        http = require('http');
    }
    let req = http.request({
        'hostname':UrlObj.hostname,
        'path':UrlObj.path,
    }, res => {
        // console.log(res);
        if (res.statusCode == 200) {
            var arr = [];
            res.on('data', buffer => {
                arr.push(buffer);
            });
            res.on('end', () => {
                var arr1 = Buffer.concat(arr);
                success && success(arr1);
            });
        }
        else if (res.statusCode == 302 || sre.statusCode == 301) {
            console.log(`这是第${index}次重定向`);
            Geturl(res.headers.location, success);
        }
    })
    req.end();
}



// Geturl('https://www.xs8.cn/chapter/18242831201004704/49062452549621087', data => {
//     // console.log(data.toString());
//     let str = data.toString();
//     // var html = gbk.toString('utf-8', data);
//     // fs.writeFile('yq.html', data, () => {
//     //     console.log('抓取成功！');
//     // })
//     let DOM = new jsdom(str);
//     let document = DOM.window.document;
//     let str1 = document.querySelector('.ywskythunderfont').innerHTML.replace(/<[^>]+>/g,"");//正则表达式去掉html标签
//     str1 = str1.replace(/(^\s*)|(\s*$)/g, "");//正则表达式去掉空格
//     str1 = str1.replace(/\s/g,"");//去掉句子间空格
//     var seg = new segment();
//     seg.useDefault();
//     // console.log(seg)
//     var strObj = seg.doSegment(str1);
//     var arr = [];
//     strObj.forEach(data => {
//         if (data.p != 2048 && data.p != 262144 && data.p != 8192 && data.p != 65536 && data.p != 268435456) {
//             arr.push(data.w);
//         }
//     });
//     var myJson = {};
//     arr.forEach(data => {
//         if(!myJson[data]){
//             myJson[data] = 1;
//         }
//         else{
//             myJson[data]++;
//         }
//     })
//     var arr1 = [];
//     for(let word in myJson){
//         if(myJson[word] != 1){
//             arr1.push({
//                 w:word,
//                 c:myJson[word],
//             });
//         }
//     }
//     arr1.sort((json1,json2)=>json2.c-json1.c)
//     console.log(arr1);
// });