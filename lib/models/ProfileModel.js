import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Dyutimoy Bhunia"
    },
    bio: {
        type: String,
        default: "Full Stack Developer & Technical Writer"
    },
    image: {
        type: String,
        default: "/author_img.png"
    },
    linkedin: {
        type: String,
        default: "https://www.linkedin.com/in/dyutimoy-bhunia-7241a1254/"
    },
    github: {
        type: String,
        default: "https://github.com"
    }
});

const ProfileModel = mongoose.models.profile || mongoose.model('profile', Schema);

export default ProfileModel;
