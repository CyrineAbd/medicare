import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String },
    photo: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
});

export default mongoose.model("Admin", adminSchema);

