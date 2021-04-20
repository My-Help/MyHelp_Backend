var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    /*username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },*/
    service_provider:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    }
});
User.plugin(passportLocalMongoose);

const user = mongoose.model('User',User);

module.exports = user;