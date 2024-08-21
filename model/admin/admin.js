// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // Schema definition
// const adminSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         default: null
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true // Automatically adds createdAt and updatedAt fields
// });

// // Pre-save hook to hash password
// adminSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });


// module.exports = mongoose.model("Admin", adminSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema definition
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to hash password
adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err); // Handle errors during password hashing
        }
    }
    next();
});

// Instance method to compare plain password with hashed password
adminSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error('Error comparing passwords'); // Handle errors during password comparison
    }
};

// Export the model
module.exports = mongoose.model('Admin', adminSchema);

