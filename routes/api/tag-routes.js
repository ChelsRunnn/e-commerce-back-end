const router = require('express').Router();
const { rmSync } = require('fs');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all Tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // Include its associated Category and Tag data
      include: [{ model: Product }],
      // ! Category name returning as null. check insomnia
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if(!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
