import mongoose from "mongoose";

const userschema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true }

}, { timestamps: true })

const user = mongoose.model("User", userschema);

export default user