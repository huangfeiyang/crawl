const express = require('express');
const server = express();
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const jsdom = require('jsdom').JSDOM;
const segment = require('segment');
const cT = require('./crawl/crawlTest2');
var index = 0;


server.listen(9876);
server.use('/getMsg', (req, res) => {
    // console.log(req.query,req);
    // res.send({'ok':1});
    cT.Geturl(req.query.str, data => {
        let str = data.toString();
        // var html = gbk.toString('utf-8', data);
        // fs.writeFile('yq.html', data, () => {
        //     console.log('抓取成功！');
        // })
        let DOM = new jsdom(str);
        let document = DOM.window.document;
        let str1 = document.querySelector('.ywskythunderfont').innerHTML.replace(/<[^>]+>/g,"");//正则表达式去掉html标签
        str1 = str1.replace(/(^\s*)|(\s*$)/g, "");//正则表达式去掉空格
        str1 = str1.replace(/\s/g,"");//去掉句子间空格
        var seg = new segment();
        seg.useDefault();
        // console.log(seg)
        var strObj = seg.doSegment(str1);
        var arr = [];
        strObj.forEach(data => {
            if (data.p != 2048 && data.p != 262144 && data.p != 8192 && data.p != 65536 && data.p != 268435456) {
                arr.push(data.w);
            }
        });
        var myJson = {};
        arr.forEach(data => {
            if(!myJson[data]){
                myJson[data] = 1;
            }
            else{
                myJson[data]++;
            }
        })
        var arr1 = [];
        for(let word in myJson){
            if(myJson[word] != 1){
                arr1.push({
                    w:word,
                    c:myJson[word],
                });
            }
        }
        arr1.sort((json1,json2)=>json2.c-json1.c);
        // console.log(arr1);
        res.send({'test':arr1});
        // return arr1;
})
})
server.use(express.static('./'));
