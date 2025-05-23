const pool = require('../database_settings/db');

// // Users Table CRUD
// const createUser = async (name, email) => {
//   const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
//   return result.rows[0];
// };

// const getUsers = async () => {
//   const result = await pool.query('SELECT * FROM users');
//   return result.rows;
// };

// const updateUser = async (id, name, email) => {
//   const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
//   return result.rows[0];
// };

// const deleteUser = async (id) => {
//   await pool.query('DELETE FROM users WHERE id = $1', [id]);
// };


// CRUD for closed_mosques table
const createClosedMosque = async (mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes) => {
  const result = await pool.query(
    `INSERT INTO closed_mosques (mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
    [mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes]
  );
  return result.rows[0];
};

const getClosedMosques = async () => {
  const result = await pool.query('SELECT * FROM closed_mosques');
  return result.rows;
};

const updateClosedMosque = async (id, mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes) => {
  const result = await pool.query(
    `UPDATE closed_mosques SET mosque_name_ar = $1, directorate = $2, mosque_address = $3, closure_date = $4, closure_reason = $5, mosque_area = $6, nearest_mosque = $7, population_density = $8, within_urban_boundary = $9, needs_maintenance = $10, needs_renovation = $11, technical_committee_notes = $12 WHERE mosque_id = $13 RETURNING *`,
    [mosque_name_ar, directorate, mosque_address, closure_date, closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes, id]
  );
  return result.rows[0];
};

const deleteClosedMosque = async (id) => {
  await pool.query('DELETE FROM closed_mosques WHERE mosque_id = $1', [id]);
};

module.exports = {
  // createUser,
  // getUsers,
  // updateUser,
  // deleteUser,
  // getOpening,
  createClosedMosque,
  getClosedMosques,
  updateClosedMosque,
  deleteClosedMosque,
};