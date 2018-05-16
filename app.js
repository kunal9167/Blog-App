var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose")
    methodOverride  = require("method-override") ;
    
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

//INDEX ROUTE
app.get("/blogs", function(req,res){
    
    Blog.find({},function(error, blogs){
        if(error)
            console.log(error);
        else{
            res.render("index",{blogs});
        }
    });    
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//Create Route
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err){
        if(err)
            res.render("new");
        else
            res.redirect("/blogs");
    });
});

// SHOW ROUTE
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show",{blog:foundBlog})
        }
    })
})

// EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
    
    Blog.findById(req.params.id,function(error,foundBlog){
        if(error)
            res.redirect("/blogs");
        else{
            res.render("edit",{ blog:foundBlog });
        }
    });

});
    
//UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err)
            res.redirect("/")
        else{
            res.redirect("/blogs/"+req.params.id);
        }

    });
})

app.delete("/blogs/:id" , function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.redirect("/blogs");
        else
            res.redirect("/blogs");
    })
});

app.listen(3000,function(){
    console.log("App is running");
})