var express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = 'BooksStore';
let db;
MongoClient.connect(url, { useUnifiedTopology: true ,useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);
    
});

router.get('/home',(req,res)=>{
    db.collection("Books").find().toArray().then(result => res.render('Home',{record:result}));
})
/*router.get('/edit/:product_id',(req,res)=>{
    res.render('edit');
})*/
router.get('/edit/:product_id',(req,res)=>{
    var product_id =parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("Books").findOne(query, function(err, result) {
        if (err) throw err;
        //console.log(result.test_id);
        res.render('Update',{record:result});
      });
})

router.post('/edit',(req,res)=>{
    var product_id =parseInt(req.body.product_id);
    console.log(product_id);
    var brand = req.body.brand;
    var category = req.body.category;
    var name = req.body.name;
    var size = parseInt(req.body.size);
    var quantity= parseInt(req.body.quantity);
    var cost_price = parseInt(req.body.cost_price);
    var selling_price = parseInt(req.body.selling_price);
    var query={"product_id":product_id};
    var update_query={$set:{
        "brand": brand,
        "category": category,
        "name": name,
        "size": size,
        "quantity": quantity,
        "cost_price": cost_price,
        "selling_price": selling_price
    }};
    console.log(update_query);
    db.collection("Books").updateOne(query,update_query, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
      });
      res.redirect('/home');
})
router.get('/delete_product',(req,res)=>{
    res.render('delete');
})
router.post('/delete_product',(req,res)=>{
    var product_id = parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("Books").deleteOne(query, function(err, result) {
        if (err) throw err;
        console.log(result.product_id);
      });
      res.redirect('/home');
})
router.get('/delete/:product_id',(req,res)=>{
    var product_id = parseInt(req.params.product_id);
    var query={"product_id":product_id};
    db.collection("Books").deleteOne(query, function(err, result) {
        if (err) throw err;
        console.log(result.product_id);
      });
      res.redirect('/home');
})
router.get('/add',(req,res)=>{
    res.render('add');
})
router.post('/add',(req,res)=>{
    var product_id = parseInt(req.body.product_id);
    var genre = req.body.genre;
    var name = req.body.name;
    var author = req.body.author;
    var quantity= req.body.quantity;
    var selling_price = req.body.selling_price;
    var query={
        "product_id":product_id,
        "genre": genre,
        "name": name,
        "author": author,
        "quantity": quantity,
        "selling_price": selling_price
    };
    console.log(query);
    db.collection("Books").insertOne(query, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
      });
      res.redirect('/home');
})

router.get('/sales_details',(req,res)=>{
    db.collection("Books").find().toArray().then(result => res.render('sales_details',{record:result}));
})

module.exports = router
