const { DataTypes } = require('sequelize');
const { sequelize } = require('../database_settings/db');

const Project = sequelize.define('Project', {
    project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_name_ar: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'اسم المشروع'
    },
    project_name_en: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Project Name in English'
    },
    project_value: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        comment: 'قيمة العملية (التعاقد)'
    },
    expended: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        comment: 'المنصرف'
    },
    current_implementation_rate: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        comment: 'نسبة التنفيذ الحالية'
    },
    remaining_contract_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        comment: 'المتبقي من العقد'
    },
    execution_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'بداية التنفيذ'
    },
    expected_completion_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'التاريخ النهائي المتوقع'
    },
    project_image_path: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'صور المشروع'
    },
    gps_coordinates: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'التوقيع المكاني'
    },
    funding_source: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'التمويل الذاتي/الاستثماري',

    }
}, {
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// CRUD Operations
const createProject = async (project_name_ar, project_name_en, project_value, expended, 
    current_implementation_rate, remaining_contract_amount, execution_start_date, 
    expected_completion_date, project_image_path, gps_coordinates, funding_source) => {
    return await Project.create({
        project_name_ar,
        project_name_en,
        project_value,
        expended,
        current_implementation_rate,
        remaining_contract_amount,
        execution_start_date,
        expected_completion_date,
        project_image_path,
        gps_coordinates,
        funding_source
    });
};

const getProjects = async (filter = {}) => {
    return await Project.findAll(filter);
};

const updateProject = async (project_id, project_name_ar, project_name_en, project_value, expended,
    current_implementation_rate, remaining_contract_amount, execution_start_date,
    expected_completion_date, project_image_path, gps_coordinates, funding_source) => {
    const project = await Project.findByPk(project_id);
    if (!project) {
        throw new Error('Project not found');
    }
    return await project.update({
        project_name_ar,
        project_name_en,
        project_value,
        expended,
        current_implementation_rate,
        remaining_contract_amount,
        execution_start_date,
        expected_completion_date,
        project_image_path,
        gps_coordinates,
        funding_source
    });
};

const deleteProject = async (project_id) => {
    const project = await Project.findByPk(project_id);
    if (!project) {
        throw new Error('Project not found');
    }
    await project.destroy();
};

module.exports = {
    Project,
    createProject,
    getProjects,
    updateProject,
    deleteProject
};