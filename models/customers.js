var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Customers = new Schema({
    Customer_Username:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique:true
    },
    Gender:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

});

const Customer = mongoose.model("Customer",Customers);

module.exports = Customer;