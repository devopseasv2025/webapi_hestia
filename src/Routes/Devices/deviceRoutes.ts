import express from "express";


const deviceRoutes = express.Router();


deviceRoutes.get("/" , (req, res) => res.send("Welcome"));

export { deviceRoutes };