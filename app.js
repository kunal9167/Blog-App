var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose");
    
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type:Date,
        default: Date.now
    }
});

var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//     title: "Football",
//     image: "https://images.unsplash.com/photo-1522952578391-59f9d9bb1ae2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1660343f12713e00065208b07fe0b951&auto=format&fit=crop&w=500&q=60",
//     body:  "A cool picture of a football on a playground"
// })

app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
    
    Blog.find({},function(error, blogs){
        if(error)
            console.log(error);
        else{
            res.render("index",{blogs});
        }
    });    
});

app.listen(3000,function(){
    console.log("App is running");
})