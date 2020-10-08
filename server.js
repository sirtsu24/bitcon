const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', ejs);

app.get('/', function(req, res){
    res.render("index.ejs", {currency: "", amount: "", code: ""});
});

app.post('/', function(req, res){
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/euro.json';
    let currency = req.body.currency;
    let amount = req.body.amount;
    console.log(currency);
    axios.get(url)
    .then(function(response){
        let rate;
        let code;
        let calculate;
        if(currency === 'EUR'){
            rate = response.data.bpi.EUR.rate_float;
            code = response.data.bpi.EUR.code;
            calculate = (rate * amount).toFixed(2);
        } else {
            rate = response.data.bpi.USD.rate_float;
            code = response.data.bpi.USD.code;
            calculate = (rate * amount).toFixed(2);
        }
        res.render("index.ejs", {currency: calculate, code: code});
    })
    .catch(function(error){
        console.log(error);
    });

});

app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
});