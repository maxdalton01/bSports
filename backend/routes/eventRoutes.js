module.exports = app => {
    const events = require("../controllers/eventController.js");
    var router = require("express").Router();

    // make new event
    router.post("/", events.create);

    // load all events
    router.get("/", events.getAll);

    app.use('/api/events', router);
};