const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const {page = 1, limit = 10, sort, keyword} = req.query;
        const query = {};
        if (keyword) {
            query.$or = [{title: {$regex: keyword, $options: 'i'}}, {description: {$regex: keyword, $options: 'i'}}];
        }
        let sortOption = {};
        if (sort) {
            const sortFields = sort.split(',');
            sortFields.forEach(field => {
                const sortOrder = field.startsWith('-') ? -1 : 1;
                const fieldName = field.replace(/^-/, '');
                sortOption[fieldName] = sortOrder;
            });
        } else {
            sortOption = {createdAt: -1};
        }
        const products = await Product.find(query)
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        const total = await Product.countDocuments(query);
        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: products
        });
    } catch (error) {
        res.status(500).json({message: 'Internal Server error'});
    }
};

module.exports = {
    getProducts
};
