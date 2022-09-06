require('dotenv').config()

const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const jobsRoutes = require('./routes/jobs')
const userRoutes = require('./routes/user')

//Create express app
const app = express();
//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next();
})
//routes
app.use('/api/jobs', jobsRoutes)
app.use('/api/users', userRoutes)

//connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://timothydoan:Salad2003.@jobs.tfvsh.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('connected and listening on port', process.env.PORT)
        })
    })
       .catch((err)=> {
        console.log(err);
    })

   


