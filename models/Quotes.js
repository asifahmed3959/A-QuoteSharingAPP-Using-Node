const mongoose = require("mongoose");
const Joi = require("joi");

const QuoteSchema = new mongoose.Schema({
        quote: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxLength: 255
        },
        author_id : {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },

        date: {
            type: Date,
            default: Date.now,
        }
    }
);

const Quotes = mongoose.model("Quote", QuoteSchema);


function validateQuote(quote) {
    const schema = Joi.object({
        quote: Joi.string().min(5).max(255).required(),
        author_id: Joi.objectId(),
        date: Joi.date(),
    });
    return schema.validate(quote);
}

exports.Quote = Quotes;
exports.validateQuote = validateQuote;

