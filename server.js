const express = require("express");
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const app = express();
const port = 3000;


app.use(express.json());


const restaurantRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantRouter);


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})