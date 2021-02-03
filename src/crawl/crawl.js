const http = require('http');
const fs = require('fs');

let req = http.request({
    'hostname':'wallpaperm.cmcm.com',
    'path':'/0c1c9e7ade8dbac90130a5c54ed43797.jpg',
},res => {
    var arr = [];
    var str = '';
    res.on('data', buffer => {
        arr.push(buffer);
        str += buffer;
    });
    res.on('end', () => {
        var arr1 = Buffer.concat(arr);
        // console.log(arr1);
        fs.writeFile('test.jpg', arr1, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('抓取成功');
        });
        console.log(str);
    });
})
req.end();