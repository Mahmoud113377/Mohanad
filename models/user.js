import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;