const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authUser = require("../../auth/authUser");
const ProductCategoryModel = require("../../../database/models/admin/ProductCategoryModel");

const checker = [
  authUser,
  [check("catname", "Please enter a Category Name").not().isEmpty()],
];
router.post("/", [...checker], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  let { catname, subcat } = req.body;
  catname = catname.trim().toLowerCase();
  subcat = subcat && subcat.trim().toLowerCase();
  let subcatnames = [];
  if (subcat) {
    subcatnames = subcat.split(",");
  }
  // return console.log(subcatnames);
  try {
    let inputExist = await ProductCategoryModel.findOne({ name: catname });
    if (inputExist) {
      return res.status(400).json({
        error: {
          msg:
            "Sorry this Product Category  already exist you can only add a Subcategory",
        },
      });
    }
    const cat = new ProductCategoryModel({
      name: catname,
      subCategories: subcatnames,
    });
    await cat.save();
    const getCats = await ProductCategoryModel.find();
    return res.status(200).json({ success: [...getCats] });
  } catch (error) {
    next(error);
    console.log(error.message);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});
router.post("/edit", [...checker], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  let { catname, subcat, catid } = req.body;
  catname = catname.trim().toLowerCase();
  subcat = subcat && subcat.trim().toLowerCase();
  let subcatnames = [];
  if (subcat) {
    subcatnames = subcat.trim().split(",")
  }

  try {
    let inputExist = await ProductCategoryModel.findOne({ _id: catid });
    if (!inputExist) {
      return res.status(400).json({
        error: {
          msg:
            "Sorry this Product Category  already exist you can only add a Subcategory",
        },
      });
    }
    if (inputExist) {
        await ProductCategoryModel.updateOne(
          {
            _id: inputExist._id,
          },
          {
            name: catname,
            subCategories:subcatnames,
          }
        );
        return res.status(200).json({
          success: { msg: "New Product Sub Category added successfully" },
        });
    }
    const getCats = await ProductCategoryModel.find();
    return res.status(200).json({ success: [...getCats] });
  } catch (error) {
    next(error);
    console.log(error.message);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

// Delet full category and subcategories
router.post("/delete", authUser, async (req, res, next) => {
  let { delcat } = req.body;
  try {
    let inputExist = await ProductCategoryModel.findOne({ _id: delcat });
    if (!inputExist) {
      return res.status(400).json({
        error: { msg: "Sorry this product category does not exist " },
      });
    }
    let deleted = await ProductCategoryModel.findOneAndDelete({ _id: delcat });
    const cats = await ProductCategoryModel.find();
    if (deleted) {
      return res.status(200).json({ success: [...cats] });
    } else {
      return res.json({ success: { msg: "Error something went wrong " } });
    }
  } catch (error) {
    next(error);
    console.log(error.message);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

// Delete just subcategories
// /api/admin/posts/product-categories/subcategory/delete
router.post("/subcategory/delete", authUser, async (req, res, next) => {
  let { catid, subcat } = req.body;
  try {
    let inputExist = await ProductCategoryModel.findOne({ _id: catid });
    if (!inputExist) {
      return res.json({
        error: { msg: "Sorry no such category " },
      });
    }

    await ProductCategoryModel.findOneAndUpdate(
      { _id: catid },
      {
        $pull: {
          subCategories: subcat.toLowerCase(),
        },
      }
    );
    let getCats = await ProductCategoryModel.find();
    return res.status(200).json({ success: [...getCats] });
  } catch (error) {
    next(error);
    console.log(error.message);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

router.get("/", authUser, async (req, res) => {
  try {
    let categories = await ProductCategoryModel.find();
    return res.status(200).json({ success: categories });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});
module.exports = router;
