const pool = require('../database_settings/db');

// CRUD for blocked_projects table
const createBlockedProject = async (mosque_name_ar, directorate, mosqueAddress, contractDate, delayReasons, contractorName, actionsTaken, latestUpdate, resolutionStatus) => {
  const result = await pool.query(
    `INSERT INTO blocked_projects (mosque_name_ar, directorate, mosque_address, contract_date, delay_reasons, contractor_name, actions_taken, latest_update, resolution_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [mosque_name_ar, directorate, mosqueAddress, contractDate, delayReasons, contractorName, actionsTaken, latestUpdate, resolutionStatus]
  );
  return result.rows[0];
};

const getBlockedProjects = async () => {
  const result = await pool.query('SELECT * FROM blocked_projects');
  return result.rows;
};

const updateBlockedProject = async (id, mosqueNameAr, directorate, mosqueAddress, contractDate, delayReasons, contractorName, actionsTaken, latestUpdate, resolutionStatus) => {
  const result = await pool.query(
    `UPDATE blocked_projects SET mosque_name_ar = $1, directorate = $2, mosque_address = $3, contract_date = $4, delay_reasons = $5, contractor_name = $6, actions_taken = $7, latest_update = $8, resolution_status = $9 WHERE delayed_project_id = $10 RETURNING *`,
    [mosqueNameAr, directorate, mosqueAddress, contractDate, delayReasons, contractorName, actionsTaken, latestUpdate, resolutionStatus, id]
  );
  return result.rows[0];
};

const deleteBlockedProject = async (id) => {
  await pool.query('DELETE FROM blocked_projects WHERE delayed_project_id = $1', [id]);
};

module.exports = {
  createBlockedProject,
  getBlockedProjects,
  updateBlockedProject,
  deleteBlockedProject,
};
