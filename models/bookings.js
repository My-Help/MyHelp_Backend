var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Bookings = new Schema({
    Customers_Username:{
        type:String,
        required:true,
    },
    ServiceProviders_Username:{
        type:String,
        required:true,
    },
    DateTime:{
        type:String,
        required:true
    },
    TimeSlot:{
        type:String,
        required:true
    },
    ProblemDescription:{
        type:String,
        required:true
    },
    Completed:{
        type:Boolean,
        default:false
    },
    Feedback:{
        type:Boolean,
        default:false
    }
});

const Booking = mongoose.model("Booking",Bookings);

module.exports = Booking;