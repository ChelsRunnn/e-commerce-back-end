const router = require('express').Router();
const { rmSync } = require('fs');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all Tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // Include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk( req.params.id, {
      include: [{ model: Product}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  if (req.body.tag_name) {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
// router.delete('/:id', async (req, res) => {
//   try {
//     const tagData = await Tag.destroy({
//       where: {
//         id: req.params.id,
//       },
//     })
//     // If no category exists with the given id, throw 404 status & added message
//     if (!tagData) {
//       res.status(404).json({ message: 'No tag found with that id!' });
//       return;
//     }
//     // Otherwise, throw successful 200 status message
//     res.status(200).json(tagData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete('/:id', async (req, res) => {
  if (req.params.id) {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(tagData);
  } else {
    res.status(500).json()
  }
});

module.exports = router;
