const Users = require('../Models/User')

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ msg: "Admin resources access denied." });
        }

        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authAdmin;

