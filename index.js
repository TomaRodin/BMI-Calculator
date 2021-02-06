const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));



app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/normal.html');
})

app.post('/',function(req,res){
    console.log(req.body.username)
    console.log(req.body.comment)
    var height_square = req.body.comment*req.body.comment
    var preresult = req.body.username / height_square
    var result = preresult.toFixed(2)
    console.log(result);
    
    if (result <= 18.5){
    console.log('Underweight')
    res.send({redirect:true, url:"http://localhost:3000/underweight"});

        app.get('/underweight',function(req,res){
        res.send('<h1>Underweight</h1>'
        + '<p>Your BMI is : '+result+'</p>'
        + '<a href="/">Back</a>')
        })

    } else if (result >= 18.5 & result <= 24.9){
        console.log('Normal Weight')
        res.send({redirect:true, url:"http://localhost:3000/normal"});

        app.get('/normal',function(req,res){
            (Math.round(result * 100) / 100).toFixed(2);
            res.send('<h1>Normal Weight</h1>'
            + '<p>Your BMI is : '+result+'</p>'
            + '<a href="/">Back</a>')
            res.end()
            
       })
       
    } else if (result >= 25 & result <= 29.9){
        console.log('Overweight')
        res.send({redirect:true, url:"http://localhost:3000/overweight"});

        app.get('/overweight',function(req,res){
        res.send('<h1>Overweight</h1>'
        + '<p>Your BMI is : '+result+'</p>'
        + '<a href="/">Back</a>')
        })

    }else if (result > 29.9){
        console.log('Obesity')
        res.send({redirect:true, url:"http://localhost:3000/obesity"});

        app.get('/obesity',function(req,res){
        res.send('<h1>Obesity</h1>'
        + '<p>Your BMI is : '+result+'</p>'
        + '<a href="/">Back</a>')
        })
    }
})





app.listen(3000)