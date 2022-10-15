const {Quote, validateQuote} = require('../models/Quotes');
const express = require('express')
const {User, validate} = require("../models/Users");
const router = express.Router();



router.post('/quotes', async (req, res) => {
    //First Validate The Request
    const { error } = validateQuote(req.body);
    if (error){
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }

    // check if this user already exists
    let user = await User.findOne({ id : req.body.author_id })

    if(!user){
        return res.status(400).send('That user does not exist')
    } else{
        quote = new Quote({
            quote : req.body.quote,
            author_id : req.body.author_id
        });
        await quote.save();
        res.status(201).send(quote);
    }
});


router.get("/quotes", (req, res) => {

    function QuoteHandler(error, quotes){
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        else {
            res.status(200).send(quotes);
        }
    }

    if (req.query.author_id){
        Quote.find({author_id : req.query.author_id}, QuoteHandler).populate({ path: 'author_id', select: ['email' , 'username', 'first_name', 'last_name'] });
    }
    else{

        console.log("was right here2");
        Quote.find({}, QuoteHandler).populate({ path: 'author_id', select: ['email' , 'username', 'first_name', 'last_name'] });
    }

});



module.exports = router
