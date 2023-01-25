const express = require("express")
const cors = require("cors");
const usersRoute = require("./routes/usersRoute")
// const recipesRoute = require("./routes/recipesRoute")
// const adminRoutes = require("./routes/adminRoutes")
// const profileRoutes = require('./routes/profileRoutes');
const bcrypt = require('bcrypt');
// const adminCheck = require("./middleware/adminCheck")
const app = express();

require("dotenv").config()
require("../food-explorer-be/controllers/mongoose");
app.use(express.json())
// app.use(express.static('images'))
app.use(cors());

// app.use('/api/admin', adminCheck, adminRoutes);
app.use('/users', usersRoute);
// app.use('profile', profileRoutes);
// app.use("*",(req,res)=>{

//     res.status(418).send({message: "oops page not found"})
// })
// app.use((err,req,res,next)=>{
//     console.log(err)
//     res.status(err.statusCode).send(err.message)
// }) // then on the next i wil declare it then i can use it add err.statusCode=500 next(err.statusCode)
// const err= new Error("password nto match")

app.listen(8080, () => {
    console.log("server is running on port 8080")
})