/*
 * RiGaSa - Prefs model
 */
"use strict";

const mongoose = require("mongoose");

/* Schema */
const prefsSchema = new mongoose.Schema({
    firebase: {
        apiKey: { type: String },
        authDomain: { type: String },
        databaseURL: { type: String },
        projectId: { type: String },
        storageBucket: { type: String },
        messagingSenderId: { type: String }
    },
    lang: { type: String, default: "fr-FR" },
    paths: {
        root_url: { type: String },
        ws_url: { type: String },
        pec_url: { type: String },
        cdn_url: { type: String },
        cdn_img_url: { type: String },
        cdn_photos_url: { type: String },
        cdn_odd_img_url: { type: String },
        gmaps_url: { type: String },
        blasons_url: { type: String }

    },
    gmaps: {
        lat: Schema.Types.Decimal128,
        lng: Schema.Types.Decimal128,
        zoom: { type: Number, min: 0 }
    },
    slideshow: {
        control_speed: { type: Number, min: 0 },
        slideshow_speed: { type: Number, min: 0 }
    },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});

/* Model */
const Prefs = mongoose.model('Prefs', prefsSchema);

/* expose Prefs to require() */
//module.exports = Prefs;
module.exports = prefsSchema;