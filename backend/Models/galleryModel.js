const { DataTypes } = require('sequelize');
const { sequelize } = require('../database_settings/db');

const Gallery = sequelize.define('Gallery', {
    image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'project_id'
        },
        onDelete: 'CASCADE'
    },
    image_path: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    image_caption: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'gallery',
    timestamps: false
});

// CRUD Operations
const createImage = async (project_id, image_path, image_caption) => {
    return await Gallery.create({ project_id, image_path, image_caption });
};

const getImages = async () => {
    return await Gallery.findAll();
};

const updateImage = async (image_id, image_caption) => {
    const image = await Gallery.findByPk(image_id);
    if (!image) {
        throw new Error('Image not found');
    }
    return await image.update({ image_caption });
};

const deleteImage = async (image_id) => {
    const image = await Gallery.findByPk(image_id);
    if (!image) {
        throw new Error('Image not found');
    }
    await image.destroy();
};

module.exports = {
    Gallery,
    createImage,
    getImages,
    updateImage,
    deleteImage
};
