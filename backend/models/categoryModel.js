const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
 
name : String,
slug : String,
image: String,
owner: String

});

const CategoryModel = new mongoose.model("categoryData", categorySchema);
module.exports = { CategoryModel };
