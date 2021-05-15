const db = require("../models");
const Event = db.events;

exports.create = (req, res) => {
    // create new event
    const event = new Event({
        sport: req.body.sport,
        location: req.body.location,
        attendees: 0 // new event, no attendees yet
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
    
};
