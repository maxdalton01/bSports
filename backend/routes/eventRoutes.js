module.exports = app => {
    const events = require("../controllers/eventController.js");
    var router = require("express").Router();
    const express = require("express");
    // make new event
    router.post("/", events.create);

    // load all events
    router.get("/", events.getAll);

    // add attendee to event with id
    router.put("/:id/:user", events.addAttendee);

    // remove event with id
    router.delete("/:id", events.delete)

    // filter events: takes in a JSON object
    router.post("/filter", express.json({extended: true}), express.urlencoded({extended: true}),events.filter);

    app.use('/api/events', router);
};