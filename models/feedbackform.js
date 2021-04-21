var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FeedbackForms = new Schema({
    Customers_Username:{
        type:String,
        required:true,
    },
    ServiceProvider_Username:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true
    }
});

const Feedbackform = mongoose.model("FeedbackForm",FeedbackForms);

module.exports = Feedbackform;