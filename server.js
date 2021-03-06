require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express("");

app.use((cors()));
app.use(express.json());

app.get("/restaurants", async (req, res) => {

    try {
      //  const data = await db.query("SELECT * FROM restaurants");
        const data = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id;");
         console.log(data);
        res.status(200).json({
            status: "success",
            results: data.rows.length,
            
            data: {
                restaurants: data.rows
            },
            
        });

    } catch (err) {
        console.log(err);
    }

});

app.get("/restaurants/:id", async (req, res) => {
  

    try {
        const restaurants = await db.query("select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id =$1", [req.params.id]);
         const reviews = await db.query("SELECT * FROM reviews where restaurant_id =$1", [req.params.id]);
       // console.log(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                restaurants: restaurants.rows[0],
                reviews: reviews.rows
            },
        });

    } catch (err) {
        console.log(err);
    }


});

app.post("/restaurants", async (req, res) => {
   
    console.log(req.body);
    try {
        const r = await db.query(
            "INSERT INTO restaurants (clientID, name, location, price_range) values ($1, $2, $3, $4) returning *",
            [req.body.clientId, req.body.name, req.body.location, req.body.price_range]);
        console.log(r); 
        res.status(200).json({
            status: "success",
            data: {
                restaurants: r.rows[0]
            },
        });

    } catch (err) {
        console.log(err);
    }
});

app.put("/restaurants/:id", async (req, res) => {

    try {
        const r = await db.query(
            "UPDATE restaurants set name= $1, location= $2, price_range= $3 where id= $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(r);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: r.rows[0]
            },
        });

    } catch (err) {
        console.log(err);
    }
});

app.delete("/restaurants/:id", async (req, res) => {


    try {
        const r = await db.query(
            "DELETE FROM restaurants where id= $1", [req.params.id]);
        console.log(r);
        res.status(204).json({
            status: "success",

        });

    } catch (err) {
        console.log(err);
    }
});

app.post("/restaurants/:id/addReview", async (req, res) => {
    
    console.log(req.body);
    try {
        const r = await db.query(
            "INSERT INTO reviews(restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
            [req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.log(r);
        res.status(201).json({
            status: "success",
            data: {
               
                reviews: r.rows[0]
            
            },
        });

    } catch (err) {
        console.log(err);
    }
});

app.post("/restaurants/SignUp", async (req, res) => {
    
    console.log(req.body.name);
    try {
        const r = await db.query(
            "INSERT INTO clients(name, password) values ($1, $2) returning *",
            [req.body.name, req.body.password]);
        console.log(r);
        res.status(201).json({
            status: "success",
            data: {
               
                clients: r.rows[0]
            
            },
        });

    } catch (err) {
        console.log(err);
    }
});


//const P = process.env.PORT || 3001;

app.listen(3000, function () {
    console.log("Server has started and listing on port port}");
}) 