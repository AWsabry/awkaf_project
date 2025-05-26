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
  try {
    const { mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, 
      mosque_area, nearest_mosque, population_density, within_urban_boundary, 
      needs_maintenance, needs_renovation, technical_committee_notes } = req.body;
    
    const closedMosque = await createClosedMosque(
      mosque_name_ar, directorate, mosque_address, closure_date, closure_reason,
      mosque_area, nearest_mosque, population_density, within_urban_boundary,
      needs_maintenance, needs_renovation, technical_committee_notes
    );
    
    res.status(200).json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: closedMosque
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating closed mosque',
      error: error.message
    });
  }
});

router.get('/closed-mosques', async (req, res) => {
  try {
    const closedMosques = await getClosedMosques();
    res.json({
      success: true,
      data: closedMosques
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching closed mosques',
      error: error.message
    });
  }
});

router.put('/closed-mosques/:mosque_id', async (req, res) => {
  try {
    const { mosque_id } = req.params;
    const { mosque_name_ar, directorate, mosque_address, closure_date, closure_reason,
      mosque_area, nearest_mosque, population_density, within_urban_boundary,
      needs_maintenance, needs_renovation, technical_committee_notes } = req.body;
    
    const closedMosque = await updateClosedMosque(
      mosque_id, mosque_name_ar, directorate, mosque_address, closure_date,
      closure_reason, mosque_area, nearest_mosque, population_density,
      within_urban_boundary, needs_maintenance, needs_renovation,
      technical_committee_notes
    );
    
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: closedMosque
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating closed mosque',
      error: error.message
    });
  }
});

router.delete('/closed-mosques/:mosque_id', async (req, res) => {
  try {
    const { mosque_id } = req.params;
    await deleteClosedMosque(mosque_id);
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
      status: 200
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting closed mosque',
      error: error.message
    });
  }
});

module.exports = router;