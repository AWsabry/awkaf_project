const { DataTypes } = require('sequelize');
const { sequelize } = require('../database_settings/db');

const Constructor = sequelize.define('Constructor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contractor_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    national_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    contact_info: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'constructors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// CRUD Operations
const createConstructor = async (contractor_name, national_id, contact_info) => {
    return await Constructor.create({
        contractor_name,
        national_id,
        contact_info
    });
};

const getConstructors = async () => {
    return await Constructor.findAll();
};

const updateConstructor = async (id, contractor_name, national_id, contact_info) => {
    const constructor = await Constructor.findByPk(id);
    if (!constructor) {
        throw new Error('Constructor not found');
    }
    return await constructor.update({
        contractor_name,
        national_id,
        contact_info
    });
};

const deleteConstructor = async (id) => {
    const constructor = await Constructor.findByPk(id);
    if (!constructor) {
        throw new Error('Constructor not found');
    }
    await constructor.destroy();
};

module.exports = {
    Constructor,
    createConstructor,
    getConstructors,
    updateConstructor,
    deleteConstructor
};
