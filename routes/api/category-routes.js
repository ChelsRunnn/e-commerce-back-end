const router = require('express').Router();
const { Category, Product } = require('../../models');

// </api/categories> endpoint

// Find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find 1 category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
Category.create({
  category_name: req.category_name
})
.then((newCategory) => {
  res.status(200).json(newCategory);
})
.catch((err) => {
  res.status(500).json(err);
})
  // try {
  //   const categoryData = await Category.create({
  //    category_name: req.body.category_name,
  //   })
  //   res.status(200).json(categoryData);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.body.id,
        },
      });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    // If no category exists with the given id, throw 404 status & added message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    // Otherwise, throw successful 200 status message
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
