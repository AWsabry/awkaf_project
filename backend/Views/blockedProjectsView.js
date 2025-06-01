const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');

router.use(bodyParser.json());

const {
  createBlockedProject,
  getBlockedProjects,
  updateBlockedProject,
  deleteBlockedProject,
} = require('../Models/blockedProjectsModel');

// Blocked Projects Routes
router.post('/blocked-projects', async (req, res) => {
  try {
    const { mosque_name_ar, directorate, mosque_address, contract_date, 
      delay_reasons, constructor_id, actions_taken, latest_update, 
      resolution_status } = req.body;
    
    const blockedProject = await createBlockedProject(
      mosque_name_ar, directorate, mosque_address, contract_date,
      delay_reasons, constructor_id, actions_taken, latest_update,
      resolution_status
    );
    
    res.status(200).json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: blockedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blocked project',
      error: error.message
    });
  }
});

router.get('/blocked-projects', async (req, res) => {
  try {
    const blockedProjects = await getBlockedProjects();
    res.json({
      success: true,
      data: blockedProjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blocked projects',
      error: error.message
    });
  }
});

router.put('/blocked-projects/:delayed_project_id', async (req, res) => {
  try {
    const { delayed_project_id } = req.params;
    const { mosque_name_ar, directorate, mosque_address, contract_date,
      delay_reasons, constructor_id, actions_taken, latest_update,
      resolution_status } = req.body;
    
    const blockedProject = await updateBlockedProject(
      delayed_project_id, mosque_name_ar, directorate, mosque_address,
      contract_date, delay_reasons, constructor_id, actions_taken,
      latest_update, resolution_status
    );
    
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: blockedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blocked project',
      error: error.message
    });
  }
});

router.delete('/blocked-projects/:delayed_project_id', async (req, res) => {
  try {
    const { delayed_project_id } = req.params;
    await deleteBlockedProject(delayed_project_id);
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
      status: 200
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting blocked project',
      error: error.message
    });
  }
});

module.exports = router; 