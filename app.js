const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const userRouter = require('./router/UserRouter');
const QuoteRouter = require('./router/QuoteRouter');
const express = require('express');
const Authentication = require("./router/AuthenticationRouter");
const app = express();
const dotenv = require('dotenv');
dotenv.config();


// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology:true, useNewUrlParser: true})
    .then(() => console.log('e don connect'))
    .catch(err => console.log(err));



app.use(express.json());
app.use('/api', userRouter);
app.use('/api', QuoteRouter);
app.use('/api', Authentication);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));