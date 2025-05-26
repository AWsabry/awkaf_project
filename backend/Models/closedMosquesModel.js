const { DataTypes } = require('sequelize');
const { sequelize } = require('../database_settings/db');

const ClosedMosque = sequelize.define('ClosedMosque', {
    mosque_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mosque_name_ar: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
    closure_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'تاريخ الغلق'
    },
    closure_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'سبب الغلق'
    },
    mosque_area: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        comment: 'مساحة المسجد'
    },
    nearest_mosque: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'أقرب مسجد'
    },
    population_density: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'الكثافة السكانية'
    },
    within_urban_boundary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: 'داخل الحيز العمراني أم لا'
    },
    needs_maintenance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: 'يحتاج صيانة'
    },
    needs_renovation: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: 'يحتاج إحلال وتجديد'
    },
    technical_committee_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'ملاحظات اللجنة الفنية'
    }
}, {
    tableName: 'closed_mosques',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// CRUD Operations
const createClosedMosque = async (mosque_name_ar, directorate, mosque_address, closure_date,
    closure_reason, mosque_area, nearest_mosque, population_density, within_urban_boundary,
    needs_maintenance, needs_renovation, technical_committee_notes) => {
    return await ClosedMosque.create({
        mosque_name_ar,
        directorate,
        mosque_address,
        closure_date,
        closure_reason,
        mosque_area,
        nearest_mosque,
        population_density,
        within_urban_boundary,
        needs_maintenance,
        needs_renovation,
        technical_committee_notes
    });
};

const getClosedMosques = async () => {
    return await ClosedMosque.findAll();
};

const updateClosedMosque = async (mosque_id, mosque_name_ar, directorate, mosque_address,
    closure_date, closure_reason, mosque_area, nearest_mosque, population_density,
    within_urban_boundary, needs_maintenance, needs_renovation, technical_committee_notes) => {
    const mosque = await ClosedMosque.findByPk(mosque_id);
    if (!mosque) {
        throw new Error('Closed mosque not found');
    }
    return await mosque.update({
        mosque_name_ar,
        directorate,
        mosque_address,
        closure_date,
        closure_reason,
        mosque_area,
        nearest_mosque,
        population_density,
        within_urban_boundary,
        needs_maintenance,
        needs_renovation,
        technical_committee_notes
    });
};

const deleteClosedMosque = async (mosque_id) => {
    const mosque = await ClosedMosque.findByPk(mosque_id);
    if (!mosque) {
        throw new Error('Closed mosque not found');
    }
    await mosque.destroy();
};

module.exports = {
    ClosedMosque,
    createClosedMosque,
    getClosedMosques,
    updateClosedMosque,
    deleteClosedMosque
};