import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ['user', 'researcher', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = models.User || model('User', UserSchema);

export default User;
