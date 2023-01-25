const express= require("express")
const cors= require("cors");
const usersRoute= require("./routes/usersRoutes")
const recipesRoute= require("./routes/petRoutes")
const adminRoutes= require("./routes/adminRoutes")
const profileRoutes = require('./routes/profileRoutes');
// const adminCheck = require("./middleware/adminCheck")
const app = express();

require("dotenv").config()
require("./database/mongoose");
app.use(express.json())
app.use(express.static('images'))
app.use(cors());
// app.use('/api/admin', adminCheck, adminRoutes);
app.use('/api/users', usersRoute);
app.use('/api/profile', profileRoutes);
app.use('/api/pets', recipesRoute)
// app.use("*",(req,res)=>{
    
//     res.status(418).send({message: "oops page not found"})
// })
// app.use((err,req,res,next)=>{
//     console.log(err)
//     res.status(err.statusCode).send(err.message)
// }) // then on the next i wil declare it then i can use it add err.statusCode=500 next(err.statusCode)
// const err= new Error("password nto match")

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})