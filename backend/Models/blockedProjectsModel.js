const { DataTypes } = require('sequelize');
const { sequelize } = require('../database_settings/db');

const BlockedProject = sequelize.define('BlockedProject', {
    delayed_project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mosque_name_ar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'اسم المسجد'
    },
    directorate: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'المديرية'
    },
    mosque_address: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'عنوان المسجد'
    },
    contract_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'تاريخ التعاقد'
    },
    delay_reasons: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'أسباب التعثر'
    },
    constructor_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'اسم المقاول',
        references: {
            model: 'constructors',
            key: 'contractor_name'
        }
    },
    actions_taken: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'الخطوات التي تم اتخاذها'
    },
    latest_update: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'آخر تحديث'
    },
    resolution_status: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: 'pending',
        comment: 'حالة الحل',
        validate: {
            isIn: [['pending', 'in_progress', 'resolved']]
        }
    }
}, {
    tableName: 'blocked_projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// CRUD Operations
const createBlockedProject = async (mosque_name_ar, directorate, mosque_address, contract_date,
    delay_reasons, constructor_id, actions_taken, latest_update, resolution_status) => {
    return await BlockedProject.create({
        mosque_name_ar,
        directorate,
        mosque_address,
        contract_date,
        delay_reasons,
        constructor_id,
        actions_taken,
        latest_update,
        resolution_status
    });
};

const getBlockedProjects = async () => {
    return await BlockedProject.findAll();
};

const updateBlockedProject = async (delayed_project_id, mosque_name_ar, directorate, mosque_address,
    contract_date, delay_reasons, constructor_id, actions_taken, latest_update, resolution_status) => {
    const project = await BlockedProject.findByPk(delayed_project_id);
    if (!project) {
        throw new Error('Blocked project not found');
    }
    return await project.update({
        mosque_name_ar,
        directorate,
        mosque_address,
        contract_date,
        delay_reasons,
        constructor_id,
        actions_taken,
        latest_update,
        resolution_status
    });
};

const deleteBlockedProject = async (delayed_project_id) => {
    const project = await BlockedProject.findByPk(delayed_project_id);
    if (!project) {
        throw new Error('Blocked project not found');
    }
    await project.destroy();
};

module.exports = {
    BlockedProject,
    createBlockedProject,
    getBlockedProjects,
    updateBlockedProject,
    deleteBlockedProject
};
