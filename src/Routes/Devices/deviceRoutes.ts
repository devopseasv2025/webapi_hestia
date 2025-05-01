import express from "express";


const deviceRoutes = express.Router();


deviceRoutes.get("/" , (req, res) => res.send("Welcome"));

deviceRoutes.get("/temp", (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    

    res.send()
});

export { deviceRoutes };