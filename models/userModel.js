const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const Userschema = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required:true,
    }
});

//signup static method. 
Userschema.statics.signup = async function (email, password){
    const existingEmail= await this.findOne( {email})

    if (existingEmail){
        throw Error ('Email already exists');
    }
    //salt password 
    const saltPassWord = await bcrypt.genSalt(10);
    //hash password
    const hashedPassWord = await bcrypt.hash(password, saltPassWord);

    const user = await this.create ({email, password: hashedPassWord})
    return user;
}
module.exports = mongoose.model('User', Userschema)