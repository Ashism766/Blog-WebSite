const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/BlogSite");

let postSchema =mongoose.Schema({
    name: String,
    post: String
});

const Post = mongoose.model("post", postSchema);



const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.listen(3000, ()=>{
    console.log("The server is running on port 3000......");
});


app.get("/", (req, res) =>{

    Post.find((err, doc)=>{
        if(!err){

            res.render("home", {BG:doc, BT: doc });
        }
        else{
            console.log(err);
        }
    })

});

app.post("/compose",(req, res) =>{
   
    // bt.push(req.body.title);
    // bs.push(req.body.pos);

    var x =_.capitalize( req.body.title);
    let post = new Post({
        name: x,
        post: req.body.pos

    });

    post.save();
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

app.get("/post/:postId", (req, res)=>
{
    var x = req.params.postId;
    
    console.log("The input Value: " +x+" : ");

    Post.findOne({_id: x},(err, content)=>{
        if(!err){
           
            res.render("post", {title: content.name, body: content.post});

        }
        else{
            console.log(err);
        }
    });
});