require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan =require("morgan");
const app= express("");

app.use(express.json())

app.get("/Restaurants", async (req, res) => {

    try{
        const r = await db.query("SELECT * FROM restaurants");
        console.log(r);
        res.status(200).json({
            status: "success",
            results: r.rows.length,
            data: {
                restaurants: r.rows
            },
        });

    } catch(err){
        console.log(err);
    }
   
});

app.get("/restaurants/:id", async (req, res) => {  
    console.log(req.params.id);

    try{
        const r = await db.query("SELECT * FROM restaurants where id =$1",[req.params.id]);
        console.log(r);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: r.rows[0]
            },
        });

    } catch(err){
        console.log(err);
    }


});

app.post("/restaurants", async (req, res) => {
 
    try{
        const r = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
             [req.body.name, req.body.location, req.body.price_range]);
        console.log(r);
        res.status(200).json({
            status: "success",
            data: {
                restaurants: r.rows[0]
            },
        });

    } catch(err){
        console.log(err);
    }
});

app.put("/restaurants/:id", async (req, res) =>{
  
    try{
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

    } catch(err){
        console.log(err);
    }
});

app.delete("/restaurants/:id", async (req, res) => {
  

    try{
        const r = await db.query(
            "DELETE FROM restaurants where id= $1", [req.params.id]);
        console.log(r);
        res.status(204).json({
            status: "success",
           
        });

    } catch(err){
        console.log(err);
    }
});

//const P = process.env.PORT || 3001;

app.listen(3000, function(){
    console.log("Server has started and listing on port ${port}");
}) 