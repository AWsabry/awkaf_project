const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');


router.use(bodyParser.json());

const {
  createClosedMosque,
  getClosedMosques,
  updateClosedMosque,
  deleteClosedMosque,
} = require('../Models/closedMosquesModel');



// Closed Mosques Routes
router.post('/closed-mosques', async (req, res) => {
  const { mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes } = req.body;
  const closedMosque = await createClosedMosque(mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes);
  res.json(closedMosque);
});

router.get('/closed-mosques', async (req, res) => {
  const closedMosques = await getClosedMosques();
  res.json(closedMosques);
});

router.put('/closed-mosques/:id', async (req, res) => {
  const { id } = req.params;
  const { mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes } = req.body;
  const closedMosque = await updateClosedMosque(id, mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes);
  res.json(closedMosque);
});

router.delete('/closed-mosques/:id', async (req, res) => {
  const { id } = req.params;
  await deleteClosedMosque(id);
res.json({ message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS, status: 200 });
});

module.exports = router;