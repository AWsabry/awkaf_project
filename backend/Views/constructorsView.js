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
  try {
    const { contractor_name, national_id, contact_info } = req.body;
    
    const constructor = await createConstructor(
      contractor_name,
      national_id,
      contact_info
    );
    
    console.log('Constructor created:', constructor);
    

    res.status(200).json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.ADD_SUCCESS,
      data: constructor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating constructor',
      error: error.message
    });
  }
});

router.get('/constructors', async (req, res) => {
  try {
    const constructors = await getConstructors();
    res.json({
      success: true,
      data: constructors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching constructors',
      error: error.message
    });
  }
});

router.put('/constructors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { contractor_name, national_id, contact_info } = req.body;
    
    const constructor = await updateConstructor(
      id,
      contractor_name,
      national_id,
      contact_info
    );
    
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: constructor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating constructor',
      error: error.message
    });
  }
});

router.delete('/constructors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteConstructor(id);
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
      status: 200
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting constructor',
      error: error.message
    });
  }
});

module.exports = router;
