const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet name is required."],
        minlength: [3, "Pet name must be at least 3 characters long."]
    },
    type: {
        type: String,
        required: [true, "Pet type is required."],
        minlength: [3, "Pet type must be at least 3 characters long."]
    },
    description: {
        type: String,
        required: [true, "Pet description is required."],
        minlength: [3, "Pet description must be at least 3 characters long."]
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    }

}, {timestamps: true});

PetSchema.path("name").validate(async (name) => {
    const nameCount = await mongoose.models.Pet.countDocuments({name})
    return !nameCount
}, "name already exists")

module.exports = mongoose.model("Pet", PetSchema);