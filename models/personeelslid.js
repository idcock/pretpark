const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const adresSchema = new Schema({
    straat: {
        type: String,
        required: true
    },
    huisnummer: {
        type: Number,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    woonplaats: {
        type: String,
        required: true
    },
    land: {
        type: String,
        required: true,
        default: "België"
    }
});

// Schema
const personeelslidSchema = new Schema({
    voornaam: {
        type: String,
        required: true
    },
    familienaam: {
        type: String,
        required: true
    },
    adres: {
        type: adresSchema
    },
    geboortedatum: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Model
const Personeelslid = model("Personeelslid", personeelslidSchema, "personeel");


module.exports = Personeelslid;