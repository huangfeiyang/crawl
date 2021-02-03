const axios = require('axios');

function ajax(exchange){

    let method = exchange.type;
    let url = exchange.url;
    let data = exchange.data;
    url = url + '?' + 'str=' + exchange.data.str;
    let client = axios.get(url, (req,res)=>{
        console.log(res);
    });
}

let test = axios.get('http://localhost:9876/getMsg?str=test').then( (req,res) => {
    console.log(req.data);
    console.log(1);
})
// console.log(test.data);