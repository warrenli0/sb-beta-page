import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    // You can add additional fields as necessary. For example:
    email: String,
    photo: String,
    created: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});
const User = mongoose.model('User', userSchema);
export { User };
//# sourceMappingURL=User.js.map