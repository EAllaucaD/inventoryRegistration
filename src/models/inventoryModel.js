const pool = require('../config/db');

const insertInventory = async (inventory) => {
  const query = `
    INSERT INTO inventory (MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const { MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status } = inventory;

  const result = await pool.query(query, [MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status]);
  return result;
};

module.exports = { insertInventory };
