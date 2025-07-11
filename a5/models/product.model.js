const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    }, description: {
        type: String, required: true
    }, price: {
        type: Number, required: true
    }, createdAt: {
        type: Date, default: Date.now
    }, user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
