const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

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

     //validation
      if(!email || !password){
     throw Error('All fields must be filled.')
     }; 
     if (!validator.isEmail(email)) {
      throw Error('Not a valid Email.')
     };
     if (!validator.isStrongPassword(password)) {
     throw Error('Not a strong password')
     }
      // hashing password
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

      //login static method
      Userschema.statics.login = async function (email, password ){
     //check if fields are filled 
     if(!email || !password){
        throw Error('All fields must be filled.')
        }; 
        const user = await this.findOne({email})
        if (!user){
            throw new Error("Invalid email or password");
        };
        const matchPassword = await bcrypt.compare (password , user.password)
        if (!matchPassword){
            throw new Error ("Invalid Password")
        }
 }
module.exports = mongoose.model('User', Userschema) 