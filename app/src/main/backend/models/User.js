const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    achievements: {
        breathingExercise: { type: Boolean, default: false },
        motivationalStory: { type: Boolean, default: false },
        resistCraving: { type: Boolean, default: false },
    },
});

module.exports = mongoose.model("User", UserSchema);
