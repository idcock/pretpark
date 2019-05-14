const express = require("express");

// Models importeren
const Attractie = require("../models/attractie");

const router = express.Router();

// async toevoegen aan functie om await te kunnen gebruiken
router.get("/", async (req, res) => {
    const sorteerRichting = req.query.sort;
    // Data uit databank halen
    const attracties = await Attractie.find().populate("personeelslid").sort({
        "naam": sorteerRichting
    });
    return res.send(attracties);
});

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    // Data uit databank halen
     const attractie = await Attractie.findOne({_id}).populate("personeelslid");
     return res.send(attractie);
});

// Nieuwe attractie toevoegen
router.post("/", async (req, res) => {
    const data = req.body;

    try {
        // Maak een nieuwe attractie op basis van het model (enkel in het geheugen!)
        const nieuweAttractie = new Attractie(data);
    
        // Sla de nieuwe attractie op in de databank en geef de nieuwe attractie
        // inclusief id ook terug
        const toegevoegdeAttractie = await Attractie.create(nieuweAttractie);
    
        return res.send(toegevoegdeAttractie);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        // Om één document te verwijderen: deleteOne
        // Om meerdere documenten te verwijderen: deleteMany
        const resultaat = await Attractie.deleteOne({
            _id     // Zelfde als _id: _id
        });
    
        if (!resultaat.deletedCount) {
            return res.send(`Attractie met id ${_id} werd niet gevonden!`);
        }
    
        return res.send(`Attractie met id ${_id} succesvol verwijderd!`);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => {
    const data = req.body;

    try {
        const gewijzigdeAttractie = await Attractie.findByIdAndUpdate(
            req.params.id,
            data, {
                runValidators: true,    // Voer Schema validatie ook uit
                new: true   // Geef het aangepaste document terug (anders het oude)
            });

        if (!gewijzigdeAttractie) {
            return res.status(404).send(`Attractie met id ${req.params.id} niet gevonden.`);
        }

        return res.send(gewijzigdeAttractie);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;