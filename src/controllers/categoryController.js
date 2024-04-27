const httpStatus = require('http-status');
const Category = require('../models/categoryModel');

async function getAllCategory(req, res) {
  try {
    const categories = await Category.findAll()
    return res.status(httpStatus.OK).json(categories)
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await Category.findByPk(req.params.id);
    return res.send(category);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function createCategory(req, res) {
  try {
    const newCategory = await Category.create(req.body);
    return res
      .status(httpStatus.CREATED)
      .json(newCategory);
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: error.message })
  }
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const categoryNewName = req.body.name;
  try {
    const updatedCategory = await Category.update(
      { category: categoryNewName },
      { where: { id: categoryId } }
    );

    if (updatedCategory[0] === 1) {
      res
        .status(httpStatus.OK)
        .send('Category updated successfully.');
    } else {
      res
        .status(httpStatus.NOT_FOUND).send('Category not found.');
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send('Error updating Category: ' + error.message);
  }
}

async function deleteCategory(req, res) {
  const productId = req.params.id;

  try {
    const deletedCount = await Category.destroy({
      where: { id: productId },
    });

    if (deletedCount === 1) {
       return res
        .status(httpStatus.OK)
        .send('Product deleted successfully.');
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send('Product not found.');
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({error: error.message});
  }
}
module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}