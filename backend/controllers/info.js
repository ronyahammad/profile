require("dotenv").config({ path: "../config.env" });


const Infos = require('../Models/infos');


exports.createInfo = async (req, res) => {
    try {
        const { title, subtitle, content, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Title and content are required.' });
        }

        const newInfo = new Infos({
            title,
            subtitle,
            content,
            tags: Array.isArray(tags) ? tags : [],  // Ensure tags is an array
            creator: req.user.id
        });

        await newInfo.save();

        res.status(201).json({
            success: true,
            data: newInfo
        });
    } catch (error) {
        console.error(error);  // Log internal error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};


exports.getInfos = async (req, res) => {
    try {
        const infos = await Infos.find().exec();

        res.status(200).json({
            success: true,
            data: infos
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getInfoById = async (req, res) => {
    try {
        const info = await Infos.findById(req.params.id).populate('creator', 'name').exec();

        if (!info) {
            return res.status(404).json({ success: false, message: 'Info not found' });
        }

        res.status(200).json({
            success: true,
            data: info
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getInfoByTags = async (req, res) => {
    try {
        
        const tags = req.body.tags;

        
        const info = await Infos.find({ tags: { $in: tags } }).exec();

        if (!info || info.length === 0) {
            return res.status(404).json({ success: false, message: 'No info found with these tags' });
        }

        res.status(200).json({
            success: true,
            data: info
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.updateInfo = async (req, res) => {
    try {
        const { title, subtitle, content, tags } = req.body;

        let info = await Infos.findById(req.params.id);

        if (!info) {
            return res.status(404).json({ success: false, message: 'Info not found' });
        }

        // Update fields
        info.title = title || info.title;
        info.subtitle = subtitle || info.subtitle;
        info.content = content || info.content;
        info.tags = tags || info.tags;

        await info.save();

        res.status(200).json({
            success: true,
            data: info
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.deleteInfo = async (req, res) => {
    try {
        const info = await Infos.findById(req.params.id);

        if (!info) {
            return res.status(404).json({ success: false, message: 'Info not found' });
        }

        await info.remove();

        res.status(200).json({
            success: true,
            message: 'Info deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

