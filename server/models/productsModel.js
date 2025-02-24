const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

});

const productsModel = mongoose.model('products', productsSchema);

module.exports = productsModel;