const Pet = require("../models/pet.model");

const getOnePet = (req, res) => {
    Pet.findOne({_id: req.params.id})
        .then((singlePet) => res.json(singlePet))
        .catch((err) => {
            console.log("Error in get one Pet", err);
            res.status(400).json({
                message: "something went wrong in get one Pet",
                error: err
            })
        })
};

const getAllPets = (req, res) => {
    Pet.find({})
        .then((allPets) => res.json(allPets))
        .catch((err) => {
            console.log("Error in get all Pets", err);
            res.status(400).json({
                message: "something went wrong in get all Pets",
                error: err
            })
        })
};

const createPet = (req, res) => {
    Pet.create(req.body)
        .then((newPet) => res.status(201).json(newPet))
        .catch((err) => {
            console.log("Error in create Pet", err);
            res.status(400).json({
                message: "something went wrong in create Pet",
                error: err
            })
        })
};

const updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then((updatedPet) => res.json(updatedPet))
        .catch((err) => {
            console.log("Error in update Pet", err);
            res.status(400).json({
                message: "something went wrong in update Pet",
                error: err
            })
        })
};

const deletePet = (req, res) => {
    Pet.findOneAndDelete({_id: req.params.id})
        .then((deletedPet) => res.json(deletedPet))
        .catch((err) => {
            console.log("Error in delete Pet", err);
            res.status(400).json({
                message: "something went wrong in delete Pet",
                error: err
            })
        })
};
// update exports below to fit schema 
module.exports = {
    getOnePet,
    getAllPets,
    createPet,
    updatePet,
    deletePet
}