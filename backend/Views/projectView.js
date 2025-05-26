const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');

router.use(bodyParser.json());

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../Models/projectsModel');

// Projects Routes
router.post('/projects', async (req, res) => {
  try {
    const { project_name_ar, project_name_en, project_value, expended, 
      current_implementation_rate, remaining_contract_amount, execution_start_date, 
      expected_completion_date, project_image_path, gps_coordinates, funding_source } = req.body;
    
    const project = await createProject(
      project_name_ar, project_name_en, project_value, expended,
      current_implementation_rate, remaining_contract_amount, execution_start_date,
      expected_completion_date, project_image_path, gps_coordinates, funding_source
    );
    
    res.status(200).json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

router.put('/projects/:project_id', async (req, res) => {
  try {
    const { project_id } = req.params;
    const { project_name_ar, project_name_en, project_value, expended,
      current_implementation_rate, remaining_contract_amount, execution_start_date,
      expected_completion_date, project_image_path, gps_coordinates, funding_source } = req.body;
    
    const project = await updateProject(
      project_id, project_name_ar, project_name_en, project_value, expended,
      current_implementation_rate, remaining_contract_amount, execution_start_date,
      expected_completion_date, project_image_path, gps_coordinates, funding_source
    );
    
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.SUCCESS,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

router.delete('/projects/:project_id', async (req, res) => {
  try {
    const { project_id } = req.params;
    await deleteProject(project_id);
    res.json({
      success: true,
      message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
      status: 200
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

module.exports = router;