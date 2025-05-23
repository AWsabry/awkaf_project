

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
  const { project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source } = req.body;
  const project = await createProject(project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source);
  res.json({ message: STATIC_STRINGS.OPERATIONS.SUCCESS, data: project });
});

router.get('/projects', async (req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source } = req.body;
  const project = await updateProject(id, project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source);
  res.json({ message: STATIC_STRINGS.OPERATIONS.SUCCESS, data: project });
});

router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  await deleteProject(id);
  res.json({ message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS, status: 200 });
});

module.exports = router;