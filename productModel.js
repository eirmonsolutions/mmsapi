const mongoose = require('mongoose');

const departmentEnum = ['Liquor', 'Beer', 'Wine', 'Other'];

const productSchema = new mongoose.Schema({
    department: { 
        type: String, 
        required: true,
        enum: departmentEnum  // Enforce specific values for department
    },
    name: { type: String, required: true },
    size: { type: String, required: true }
}, {
    timestamps: true // Add createdAt and updatedAt timestamps
});

// Indexing the department field
productSchema.index({ department: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
