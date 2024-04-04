const mongoose = require("mongoose");
const productsSchema = mongoose.Schema({
 
    title : String,
    description : String,
    price : Number,
    category : String,
    image: String,
    owner: String
});

const ProductsModel = new mongoose.model("productsData", productsSchema);
module.exports = { ProductsModel };
