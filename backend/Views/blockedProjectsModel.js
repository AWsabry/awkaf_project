const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');


router.use(bodyParser.json());


const {
  // CRUD Blocked Projects
  createBlockedProject,
  getBlockedProjects,
  updateBlockedProject,
  deleteBlockedProject,
} = require('../Models/blockedProjectsModel');




// Blocked Projects Routes
router.post('/blocked-projects', async (req, res) => {
  const { mosque_name_ar, directorate, mosque_address, contract_date, delay_reasons, contractor_name, actions_taken, latest_update, resolution_status } = req.body;
  const blockedProject = await createBlockedProject(mosque_name_ar, directorate, mosque_address, contract_date, delay_reasons, contractor_name, actions_taken, latest_update, resolution_status);
  res.json(blockedProject);
});

router.get('/blocked-projects', async (req, res) => {
  const blockedProjects = await getBlockedProjects();
  res.json(blockedProjects);
});

router.put('/blocked-projects/:id', async (req, res) => {
  const { id } = req.params;
  const { mosque_name_ar, directorate, mosque_address, contract_date, delay_reasons, contractor_name, actions_taken, latest_update, resolution_status } = req.body;
  const blockedProject = await updateBlockedProject(id, mosque_name_ar, directorate, mosque_address, contract_date, delay_reasons, contractor_name, actions_taken, latest_update, resolution_status);
  res.json(blockedProject);
});

router.delete('/blocked-projects/:id', async (req, res) => {
  const { id } = req.params;
  await deleteBlockedProject(id);
  res.json({ message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS, status: 200 });
  res.sendStatus(204);
});

module.exports = router;
