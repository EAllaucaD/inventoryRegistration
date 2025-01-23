const db = require('../config/db');

exports.addInventory = async (inventoryData) => {
  const { MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status } = inventoryData;

  const query = `
    INSERT INTO inventory (MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await db.query(query, [
    MedicamentName,
    Type,
    Quantity,
    ElaborationDate,
    ExpirationDate,
    Status
  ]);

  return result.insertId;
};
