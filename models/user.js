/*
 * RiGaSa - User model
 *
 * Has some password dedicated logic.
 */
"use strict";

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userPrefsSchema = require('prefs');

const BCRYPT_COST = 4; // minimum=4

/* Roles
superadmin: Super Admin
administrator: Administrator
editor: Editor
author: Author
contributor: Contributor
subscriber: Subscriber
*/
/* Prefs
const userPrefsSchema = new mongoose.Schema({
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
    }
});
 */
/* Schema */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    hash: { type: String, set: val => this.hash },
    role: { type: String, default: "Subscriber" },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    lang: { type: String, default: "fr-FR" },
    prefs: userPrefsSchema
});

/* authentication using bcrypt */
userSchema.statics.authenticate = function(username, password) {
    return this.findOne({ name: username }).then(user => {
        if (!user)
            return false;
        return bcrypt.compare(password, user.hash).then(success => {
            return (success ? user : false);
        });
    });
};

/* set the user's password using bcrypt */
userSchema.methods.resetPassword = function(new_password) {
    return bcrypt.hash(new_password, BCRYPT_COST).then(new_hash => {
        /* here we may want to write:
         *
         * this.hash = new_hash; // will not work
         * this.save();
         *
         * but it won't work because we made the `hash' setter ignoring new
         * values. findByIdAndUpdate() will bypass the Schema setter by
         * updating the `hash' field directly in the database.
         */
        return User.findByIdAndUpdate(this._id, { $set: { hash: new_hash } });
    });
};

/* when converting to JSON, we want to hide the sensitive hash information */
userSchema.options.toJSON = {
    transform(doc, ret, options) {
        delete ret.hash;
        return ret;
    }
};

/* Model */
const User = mongoose.model('User', userSchema);

/* expose User to require() */
module.exports = User;