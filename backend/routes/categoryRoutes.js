const express = require("express");
const { auth } = require("../middleware/auth");
const { CategoryModel } = require("../models/categoryModel");

const categoryRoutes = express.Router();

categoryRoutes.use(auth);

categoryRoutes.get("/get", async (req, res) => {
  try {
    const data = await CategoryModel.find({ userID: req.body.userID });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

categoryRoutes.post("/create", async (req, res) => {
  try {
    const { name, slug, image, owner } = req.body;

    const data = new CategoryModel({ name, slug, image, owner });
    await data.save();
    res.status(201).send({ msg: "New category has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

categoryRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await CategoryModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "category not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await CategoryModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ msg: `Category with id ${id} has been updated` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

categoryRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CategoryModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: "Category not found" });
    }
    if (data.userID !== req.body.userID) {
      return res.status(403).send({ error: "Not authorized" });
    }
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({ msg: `Category with id ${id} has been deleted` });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = { categoryRoutes };
