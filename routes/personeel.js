const express = require("express");

// Models importeren
const Personeelslid = require("../models/personeelslid");

const router = express.Router();

router.get("/", async (req, res) => {
    const personeel = await Personeelslid.find();
    return res.send(personeel);
});

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    // Data uit databank halen
     const personeelslid = await Personeelslid.findOne({_id});
     return res.send(personeelslid);
});


router.post("/", async (req, res) => {
    const data = req.body;

    try {
        const nieuwPersoneelslid = new Personeelslid(data);
        const toegevoegdPersoneelslid = await Personeelslid.create(nieuwPersoneelslid);
    
        return res.send(toegevoegdPersoneelslid);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => {
    const data = req.body;

    try {
        const gewijzigdPersoneelslid = await Personeelslid.findByIdAndUpdate(
            req.params.id,
            data, {
                runValidators: true,    // Voer Schema validatie ook uit
                new: true   // Geef het aangepaste document terug (anders het oude)
            });

        if (!gewijzigdPersoneelslid) {
            return res.status(404).send(`Personeelslid met id ${req.params.id} niet gevonden.`);
        }

        return res.send(gewijzigdPersoneelslid);
    } catch (err) {
        return res.status(400).send(err);
    }
});


module.exports = router;