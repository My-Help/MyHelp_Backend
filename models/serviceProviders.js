var mongoose = require("mongoose");
var Schema = mongoose.Schema

var ServiceProviders = new Schema({
    ServiceProvider_Username:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true
    },
    MobileNo:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }

});

const ServiceProvider = mongoose.model("ServiceProvider",ServiceProviders);

module.exports = ServiceProvider;