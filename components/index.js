const express = require('express');
const cards = require('./constants.js');
const dotenv =require('dotenv');
const connectDB = require("../config/dbAccessor");
const userRoutes = require('../Routes/userRoutes');
const { errorHandler, notFound } = require('../middlewares/errorMiddlewares.js');
const cardRoutes = require("../Routes/cardRoutes");
const tableRoutes = require("../Routes/tableRoutes");
const path= require("path")

const app = express();
dotenv.config();
connectDB(); 
app.use(express.json());
const PORT = process.env.PORT || 5000;



app.use("/api/cards", cardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tables", tableRoutes);




if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../expense_manager/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../expense_manager/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

 
app.use(notFound);
app.use(errorHandler)
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
