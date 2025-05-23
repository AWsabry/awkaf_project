const pool = require('../database_settings/db');

// Constructors Table CRUD
const createConstructor = async (contractor_name, national_id, contact_info) => {
  const result = await pool.query(
    `INSERT INTO constructors (contractor_name, national_id, contact_info)
     VALUES ($1, $2, $3) RETURNING *`,
    [contractor_name, national_id, contact_info]
  );
  return result.rows[0];
};

const getConstructors = async () => {
  const result = await pool.query('SELECT * FROM constructors');
  return result.rows;
};

const updateConstructor = async (id, contractor_name, national_id, contact_info) => {
  const result = await pool.query(
    `UPDATE constructors SET contractor_name = $1, national_id = $2, contact_info = $3 WHERE id = $4 RETURNING *`,
    [contractor_name, national_id, contact_info, id]
  );
  return result.rows[0];
};

const deleteConstructor = async (id) => {
  await pool.query('DELETE FROM constructors WHERE id = $1', [id]);
};

module.exports = {
  createConstructor,
  getConstructors,
  updateConstructor,
  deleteConstructor,
};
