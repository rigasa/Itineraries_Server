/*
 * RiGaSa - Favorite router
 */
"use strict";

const express = require("express");
/* our applications modules */
const Favorite = require("./models/favorite");

const router = new express.Router();

// create a favorite
router.post("/", function(req, res, next) {
    const input = req.body;
    Favorite.create(input).then(created => {
        return res.status(201 /* Created */ ).send(created);
    }).catch(next);
});

// read all the favorites
router.get("/", (req, res, next) => {
    Favorite.find({ /* no conditions */ }).then(results => {
        return res.send(results);
    }).catch(next);
});

// read one favorite
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    // callback example
    Favorite.findById(id, (err, found) => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */ ).send();
    });
});

// update
router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const input = req.body;
    const promise = Favorite.findByIdAndUpdate(id, input, { overwrite: true, new: true });
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */ ).send();
    }).catch(next);
});

// partial update
router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    const input = req.body;
    const promise = Favorite.findByIdAndUpdate(id, { $set: input }, { new: true })
    promise.then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */ ).send();
    }).catch(next);
});

// delete a favorite
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Favorite.findByIdAndRemove(id).then(found => {
        if (found)
            return res.send(found);
        else
            return res.status(404 /* Not Found */ ).send();
    }).catch(next)
});

// expose our router to require()
module.exports = router;