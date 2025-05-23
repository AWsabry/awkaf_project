const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');



router.use(bodyParser.json());


const {
  createConstructor,
  getConstructors,
  updateConstructor,
  deleteConstructor,
} = require('../Models/constructorsModel');

// Constructors Routes
router.post('/constructors', async (req, res) => {
  const { contractor_name, national_id, contact_info } = req.body;
  const constructor = await createConstructor(contractor_name, national_id, contact_info);
  res.json({ message: STATIC_STRINGS.OPERATIONS.SUCCESS, data: constructor });
});

router.get('/constructors', async (req, res) => {
  const constructors = await getConstructors();
  res.json(constructors);
});

router.put('/constructors/:id', async (req, res) => {
  const { id } = req.params;
  const { contractor_name, national_id, contact_info } = req.body;
  const constructor = await updateConstructor(id, contractor_name, national_id, contact_info);
  res.json({ message: STATIC_STRINGS.OPERATIONS.SUCCESS, data: constructor });
});

router.delete('/constructors/:id', async (req, res) => {
  const { id } = req.params;
  await deleteConstructor(id);
  res.json({ message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS, status: 200 });
});

module.exports = router;
