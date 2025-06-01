const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { STATIC_STRINGS } = require('../static/constants.ts');
const { createImage, getImages, updateImage, deleteImage } = require('../Models/galleryModel');

router.use(bodyParser.json());

// Create an image
router.post('/gallery', async (req, res) => {
    try {
        const { project_id, image_path, image_caption } = req.body;
        const image = await createImage(project_id, image_path, image_caption);
        console.log('Image created:', image);

        res.status(200).json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.ADD_SUCCESS,
            data: image
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating image',
            error: error.message
        });
    }
});

// Get all images
router.get('/gallery', async (req, res) => {
    try {
        const images = await getImages();
        res.json({
            success: true,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching images',
            error: error.message
        });
    }
});

// Get images by project_id
router.get('/gallery/:project_id', async (req, res) => {
    try {
        const { project_id } = req.params;
        const images = await getImages({ where: { project_id } });

        res.json({
            success: true,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching images',
            error: error.message
        });
    }
});

// Update an image caption
router.put('/gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { image_caption } = req.body;
        const image = await updateImage(id, image_caption);

        res.json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.SUCCESS,
            data: image
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating image',
            error: error.message
        });
    }
});

// Delete an image
router.delete('/gallery/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteImage(id);

        res.json({
            success: true,
            message: STATIC_STRINGS.OPERATIONS.DELETE_SUCCESS,
            status: 200
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
});

module.exports = router;
