module.exports = app => {
    const events = require("../controllers/eventController.js");
    var router = require("express").Router();

    // make new event
    router.post("/", events.create);

    // load all events
    router.get("/", events.getAll);

    // add attendee to event with id
    router.put("/:id", events.addAttendee);

    // remove event with id
    router.delete("/:id", events.delete)

    // filter events: takes in a JSON object
    router.get("/filter", events.filter);

    app.use('/api/events', router);
};