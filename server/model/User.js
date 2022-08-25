import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatar: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: ""
    }
}, {timestamps: true});

export default mongoose.model('users', UserSchema);

