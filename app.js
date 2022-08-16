const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
var bt = [];
var bs = [];





const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.listen(3000, ()=>{
    console.log("The server is running on port 3000......");
});


app.get("/", (req, res) =>{

    res.render("home", {BG:bs, BT: bt });
});

app.post("/compose",(req, res) =>{
   
    bt.push(req.body.title);
    bs.push(req.body.pos);
    res.redirect("/");
   
});

app.get("/compose",(req, res)=>{

    res.render("compose");

});


app.get("/contact", (req, res)=>{
    res.render("contact");
})
app.get("/about", (req, res)=>{
    res.render("about");
})

app.get("/:anything", (req, res)=>
{
    var x = _.lowerCase(req.params.anything);
    let i = -1;
   
    
    
    
    for(var j = 0; j < bt.length; j++)
    {
         
        let y = _.lowerCase(bt[j]);


        if(y === x)
        {
 
            i = j;
            break;
        }
    }
   


    if(i >= 0){
        
        res.render("post",{title: bt[i], body: bs[i]});
    }
    else{
        res.send("<h1>PAGE NOT FOUND 404 </h1>");
    }
});