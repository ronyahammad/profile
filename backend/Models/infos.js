const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

},
    {
        timestamps: true,
    },
);

InfoSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
InfoSchema.plugin(require('mongoose-autopopulate'));

const Infos = mongoose.model("Infos", InfoSchema);

module.exports = Infos;
