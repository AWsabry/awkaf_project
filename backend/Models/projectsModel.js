const pool = require('../database_settings/db');



// Projects Table CRUD
const createProject = async (project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source) => {
  const result = await pool.query(
    `INSERT INTO projects (project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source]
  );
  return result.rows[0];
};

const getProjects = async () => {
  const result = await pool.query('SELECT * FROM projects');
  return result.rows;
};

const updateProject = async (id, project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source) => {
  const result = await pool.query(
    `UPDATE projects SET project_name_ar = $1, project_name_en = $2, project_value = $3, expended = $4, current_implementation_rate = $5, remaining_contract_amount = $6, execution_start_date = $7, expected_completion_date = $8, project_image_path = $9, gps_coordinates = $10, funding_source = $11 WHERE project_id = $12 RETURNING *`,
    [project_name_ar, project_name_en, project_value, expended, current_implementation_rate, remaining_contract_amount, execution_start_date, expected_completion_date, project_image_path, gps_coordinates, funding_source, id]
  );
  return result.rows[0];
};

const deleteProject = async (id) => {
  await pool.query('DELETE FROM projects WHERE project_id = $1', [id]);
};


module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};