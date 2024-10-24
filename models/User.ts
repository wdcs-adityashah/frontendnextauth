import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique: true, // Ensure email is unique

    },
    password:{
        type:String,
        required:false,
        unique:true,
    }
},{timestamps:true});
const User = mongoose?.models?.User || mongoose.model("User",userSchema);
export default User;
