const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        unique : true,
        lowercase: true,
        validate(value){ // To validate if email is in right format or valid. 
            if(!validator.isEmail(value)){ 
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 200,
        trim: true,
        select: false,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password cannot contain 'password'");
            }
        }
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
}, { timestamps: true }); // Added timestamps option to enable automatic timestamp handling.


userSchema.virtual('Task',{
    ref:'Task',
    localField:_id,
    foreignField:"owner"
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject. userObject.password;
    delete userObject. userObject.tokens;
    delete userObject.userObject.avatar;

    return userObject;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY)

    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token
};

userSchema.static.findByCredentials = async function(email, password){
    const user = await User.findOne({ email })
    if (!user){
        throw new Error('Unable to login');
    };
   
    const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            throw new Error('Unable to login');
        }
        return user;
}
// Hash the plain text password before saving 
userSchema.pre('save', async function (next){
    const user = this;

    if (user.isModified('password' )){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()    
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User