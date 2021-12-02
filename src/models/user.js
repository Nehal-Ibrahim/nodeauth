const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},

    email:{type:String,required:true,lowercase:true,unique:true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
        
        
        },

    age:{type:Number,default:20,
        validate(value){
            if(value<0){
                throw new Error('age is invalid')
            }
        }
        
        
    },

    password:{type:String,required:true,trim:true,minLength:6},


    tokens:[{
        token:{
        type:String,
        required:true
        }
    }]
    ,
    avatar:{
        type:Buffer
    }
}
)


userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})




userSchema.pre('save',async function(next){
    const user=this
    console.log(user)
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    
    }
   next()
})


userSchema.statics.findByCredentials =async(email,password)=>{
    const user =await User.findOne({email:email})
    if(!user){
        throw new Error('please sign up')
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}



userSchema.methods.generateToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}







const User=mongoose.model('User',userSchema)


module.exports=User