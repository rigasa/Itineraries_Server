/*
 * RiGaSa - Favorite model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const favoriteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    lang: { type: String, default: "fr-FR" }
});

/* Model */
const Favorite = mongoose.model('Favorite', favoriteSchema);

/* expose Favorite to require() */
module.exports = Favorite;