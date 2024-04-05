const express = require("express");
const { auth } = require("../middleware/auth");
const { ProductsModel } = require("../models/productsModel");


const productsRoutes = express.Router();

productsRoutes.use(auth);

productsRoutes.get("/get", async (req, res) => {
  try {
    const data = await ProductsModel.find({ owner: req.body.owner });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

productsRoutes.post("/create", async (req, res) => {
  try {
    const {title, description,price,category,image,owner } = req.body;

    
   

    const data = new ProductsModel({ title, description,price,category,image,owner});
    await data.save();
    res.status(201).send({ msg: "New Product has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

productsRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await ProductsModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Product not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await ProductsModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: `Product with id ${id} has been updated` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

productsRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductsModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Product not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await ProductsModel.findByIdAndDelete(id);
    res.status(200).send({ msg: `Product with id ${id} has been deleted` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = { productsRoutes };
