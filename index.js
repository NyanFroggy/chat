var express = require('express');
var web = express();
var fs = require('fs');
web.use(express.text());

web.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

web.get('/name.html', (req, res) => {
    res.sendFile(__dirname+'/name.html');
});

web.post('/get', (req, res) => {
    fs.readFile(__dirname+'/chat.json', 'utf8', (err, data)=>{
        res.send(data);
    });
});
web.post('/post', (req, res) => {
    fs.readFile(__dirname+'/chat.json', 'utf8', (err, data)=>{
        data = JSON.parse(data);
        data.push(req.body);
    fs.writeFile(__dirname+'/chat.json', JSON.stringify(data), (err)=>{res.sendStatus(200)});
    });
});
web.post('/change', (req, res) => {
    fs.readFile(__dirname+'/chat.json', 'utf8', (err, data)=>{
        var oldD = JSON.parse(data);
        data = JSON.parse(data);
        
        req = req.body.split(',')
        var old = req[0];
        var newV = req[1];
        for (var i = 0; i < data.length; i++){
            var msg = data[i].split(':')
            var n = msg[0];
            
            if (n == newV){
                data = oldD;
                res.sendStatus(406);
                return;
            }
            if (n == old){
                data[i] = newV+':'+msg[1];
            }
        }
        fs.writeFile(__dirname+'/chat.json', JSON.stringify(data), (err)=>{res.sendStatus(200)});
    });
});

var server = web.listen(80, ()=>{});
