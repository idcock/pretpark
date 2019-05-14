const mongoose = require("mongoose");

// Destructuring om de klasse Schema en functie model
// uit het mongoose object te halen
const { Schema, model } = mongoose;
const Personeelslid = require("./personeelslid");

// Schema
const attractieSchema = new Schema({
    naam: {
        type: String,
        required: true,
        unique: true,
    },
    minimumlengte: {
        type: Number,
        default: 1,
        min: 1,
        max:150
    },
    categorie: {
            // Array van subdocumenten
            // Elk subdocument voldoet aan een nieuw Schema
            type: [{
                type: String,
                lowercase: true,
                enum: ["thrill", "familie", "kinderen", "water"],
            }]
    },
    vip: {
        type: Boolean,
        default: false
    },
    indoor : {
        type: Boolean,
        default: false
    },
    zitArrangement: {
        type: [{
            type: String,
            lowercase: true,
            enum: ["individueel", "per karretje", "per rij"],
        }],
        validate: { // Custom validator (eigen logica schrijven)
            validator: function(waarde) {                
                return (waarde.length === 1);
            },
            message: "Je kan maar 1 zitarrangement selecteren"
        },
    },
    aantalPersonen:{
        type: Number,
        required : function() {
            return this.zitArrangement;
        },
        validate: { // Custom validator (eigen logica schrijven)
           validator: function(waarde) {                
                return ((this.zitArrangement[0] === "individueel" & waarde === 1) ||
                (this.zitArrangement[0] != "individueel" & waarde > 1));
            },
            message: "Verkeerd aantalpersonen voor gekozen zitarrangement"
        }},
    verantwoordelijke:{
        type: Schema.Types.ObjectId,
        ref: Personeelslid
    },
}, {
    timestamps: true    // Toevoegen van timestamps bij aanmaken en updaten
});

// Model

// Nieuw model maken voor Attractie documenten.
// De tweede parameter is het bijhorende Schema
// De derde parameter is de collectienaam in de databank
const Attractie = model("Attractie", attractieSchema, "attracties");

// Exporteren van model
module.exports = Attractie;