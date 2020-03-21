const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const crypto=require('crypto');
const uuidv1=require('uuid/v1');

var userSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxlength:35,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:35,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userInfo:{
        type:String,
        trim:true
    },
    crypto_Password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0,
    },
    purchases:{
        type:Array,
        default:[]
    },
    
},{
    timestamps:true
})

userSchema.virtual("password")
.set(function(password){
    this._password=password;
    this.salt=uuidv1();
    this.crypto_Password=this.securePassword(password)
})
.get(function(){
    return this._password
})

userSchema.method={
    autheticate:function(plainPassword){
        return this.securePassword(plainPassword === this.crypto_Password )
    },

    securePassword:function(plainPassword){
        if(!password){
            return ""
        }else{
            try{
                const hash=crypto.createHmac('sha256',this.salt)
                .update(plainPassword)
                .digest("hex")
                console.log('crypto passeord',hash);
                return hash;                
            }
            catch(err){
                console.log('error in securepasseord',err);
            }
        }
    }
}
module.exports = mongoose.model("User",userSchema)