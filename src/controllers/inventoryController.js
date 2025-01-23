const pool = require('../config/db');

exports.registerInventory = async (req, res) => {
    const {
        MedicamentName,
        Type,
        Quantity,
        ElaborationDate,
        ExpirationDate,
        Status
    } = req.body;

    if (!MedicamentName || !Type || !Quantity || !ElaborationDate || !ExpirationDate || !Status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const query = `
            INSERT INTO inventory (MedicamentName, Type, Quantity, ElaborationDate, ExpirationDate, Status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await pool.query(query, [
            MedicamentName,
            Type,
            Quantity,
            ElaborationDate,
            ExpirationDate,
            Status
        ]);

        return res.status(201).json({
            message: 'Inventario registrado exitosamente.',
            id: result.insertId, // insertId will be a BigInt in MariaDB/MySQL
        });
    } catch (err) {
        console.error('Error registering inventory', err.message);
        return res.status(500).json({
            message: 'Error registering inventory. Please try again later.',
        });
    }
};
