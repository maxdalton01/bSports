const db = require("../models");
const Event = db.events;

exports.create = (req, res) => {
    // validate POSTed event data
    if ( req.body.sport === null || req.body.sport.length == 0 ) {
        res.status(500).send({
            message: "Missing or empty sport"
        });
        return; // bail
    }
    if ( req.body.location === null || req.body.location.length == 0 ) {
        res.status(500).send({
            message: "Missing or empty location"
        });
        return; // bail
    }

    // create new event
    const event = new Event({
        sport: req.body.sport,
        location: req.body.location,
        attendees: 1 // new event, only user who created is attending
    });

    // save in database
    event
      .save(event)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({ // 500 is standard for database errors
              message: err.message || "Error loading to database"
          });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id; // /api/events/{request id}

    Event.findByIdAndRemove(id, {useFindAndModify: false})
      .then(data => {
          if(!data) {
              res.status(404).send({ // standard error code for not found
                  message: "Event not found"
              });
          } else {
              res.send({
                  message: "Event found and removed"
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error removing from database"
          });
      });
};

exports.getAll = (req, res) => {
    //return all
    Event.find()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Error reading from database"
          });
      });
};

exports.addAttendee = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ // stanadard code for bad request
            message: "Bad request"
        });
    }
    const id = req.params.id;

    // deprecation warning without the useFindAndModify set to false
    // $inc is a mongodb functionality for incrementing int types in database
    Event.findOneAndUpdate(id, {$inc : {'attendees' : 1}}, {useFindAndModify: false})
      .then((data) => {
          if(!data) {
              res.status(404).send({
                  message: "Event not found"
              });
          } else {
              res.send({
                  message: "Event found and attendee added"
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating database"
          });
      });
};
